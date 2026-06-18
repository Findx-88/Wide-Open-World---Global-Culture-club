"use client";
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { FEATURED_BOOKS, flagImg, slugify } from '../data/books-data';
import { useRouter } from 'next/navigation';

export default function MapComponent() {
  const svgRef = useRef(null);
  const markersRef = useRef(null);
  const zoomRef = useRef(null);       // stores the d3.zoom instance
  const svgSelRef = useRef(null);     // stores the d3 svg selection
  const [zoomLevel, setZoomLevel] = useState(1);
  const router = useRouter();

  // ── Zoom button handlers ──────────────────────────────────────────────────
  const handleZoom = (direction) => {
    if (!svgSelRef.current || !zoomRef.current) return;
    const factor = direction === 'in' ? 1.5 : 1 / 1.5;
    svgSelRef.current.transition().duration(350)
      .call(zoomRef.current.scaleBy, factor);
  };

  const handleReset = () => {
    if (!svgSelRef.current || !zoomRef.current) return;
    svgSelRef.current.transition().duration(500)
      .call(zoomRef.current.transform, d3.zoomIdentity);
  };

  useEffect(() => {
    if (!svgRef.current || !markersRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();
    d3.select('.d3-tooltip').remove();
    markersRef.current.innerHTML = '';

    const initMap = async () => {
      const svg = d3.select(svgRef.current);
      svgSelRef.current = svg;
      const width = 1000;
      const height = 500;

      try {
        const world = await d3.json("https://unpkg.com/world-atlas@2.0.2/countries-50m.json");
        const countries = topojson.feature(world, world.objects.countries);

        const projection = d3.geoEquirectangular().fitSize([width, height], countries);
        const path = d3.geoPath().projection(projection);

        const tooltip = d3.select("body").append("div")
          .attr("class", "d3-tooltip")
          .style("opacity", 0)
          .style("position", "absolute")
          .style("text-align", "center")
          .style("padding", "0.3rem 0.6rem")
          .style("font-family", "'Jost', sans-serif")
          .style("font-size", "0.55rem")
          .style("letter-spacing", "0.1em")
          .style("text-transform", "uppercase")
          .style("background", "var(--ink)")
          .style("color", "var(--cream)")
          .style("border", "1px solid var(--amber)")
          .style("pointer-events", "none")
          .style("border-radius", "2px")
          .style("z-index", 100)
          .style("transition", "opacity 0.2s");

        // ── Clip path to prevent map doubling on zoom ───────────────────
        svg.append("defs")
          .append("clipPath")
          .attr("id", "map-clip")
          .append("rect")
          .attr("width", width)
          .attr("height", height);

        // ── Zoomable group ──────────────────────────────────────────────────
        const g = svg.append("g").attr("clip-path", "url(#map-clip)");

        g.selectAll("path")
          .data(countries.features)
          .join("path")
          .attr("d", path)
          .attr("fill", "var(--card-bg)")
          .attr("stroke", "#333")
          .attr("stroke-width", 0.6)
          .style("transition", "stroke 0.3s ease, stroke-width 0.3s ease, filter 0.3s ease")
          .on("mouseover", function (event, d) {
            d3.select(this)
              .raise()
              .attr("stroke", "rgba(201, 160, 82, 0.7)")
              .attr("stroke-width", 1.0)
              .style("filter", "drop-shadow(0 0 2px rgba(201, 160, 82, 0.35))");
            tooltip.style("opacity", 1)
              .html(d.properties.name)
              .style("left", (event.pageX + 15) + "px")
              .style("top", (event.pageY - 30) + "px");
          })
          .on("mousemove", function (event) {
            tooltip.style("left", (event.pageX + 15) + "px")
              .style("top", (event.pageY - 30) + "px");
          })
          .on("mouseout", function () {
            d3.select(this)
              .attr("stroke", "#333")
              .attr("stroke-width", 0.6)
              .style("filter", "none");
            tooltip.style("opacity", 0);
          })
          .on("click", function (event, d) {
            const slug = slugify(d.properties.name);
            router.push('/library#' + slug);
          });

        // ── Markers ─────────────────────────────────────────────────────────
        const D3_COORDS = {
          'IR': [53.68, 32.42], 'KR': [127.76, 35.90], 'AF': [67.70, 33.93],
          'NG': [8.67, 9.08],   'ES': [-3.74, 40.46],  'AR': [-63.61, -38.41],
          'JP': [138.25, 36.20],'TR': [35.24, 38.96],  'RU': [105.32, 61.52],
          'CO': [-74.29, 4.57], 'BR': [-51.92, -14.23],'IN': [78.96, 20.59],
          'CN': [103.19, 35.86],'EG': [30.80, 26.82]
        };

        // Store marker data so we can reposition on zoom
        const markerData = [];
        FEATURED_BOOKS.filter(b => b.status === 'reading').forEach(b => {
          const lonlat = D3_COORDS[b.code];
          if (!lonlat) return;
          const [px, py] = projection(lonlat);
          markerData.push({ b, px, py });

          const a = document.createElement('a');
          a.style.cursor = 'pointer';
          a.onclick = () => {
            router.push(b.code === 'IR' ? '/expeditions/iran' : '/library#' + slugify(b.country));
          };
          a.className = 'map-marker';
          a.dataset.basePx = px;
          a.dataset.basePy = py;
          a.style.left = (px / width * 100) + '%';
          a.style.top  = (py / height * 100) + '%';
          a.innerHTML = `<span class="marker-dot ${b.status}"></span>
          <span class="marker-tooltip">${flagImg(b.code, 'flag-icon')} ${b.title}<small>${b.country} · ${b.status === 'reading' ? 'Active' : 'Upcoming'}</small></span>`;
          markersRef.current.appendChild(a);
        });

        // ── D3 Zoom ─────────────────────────────────────────────────────────
        const zoom = d3.zoom()
          .scaleExtent([1, 8])
          // Allow panning proportional to zoom level so the map never goes OOB
          .translateExtent([[-width * 3, -height * 3], [width * 4, height * 4]])
          .on("zoom", (event) => {
            const { transform } = event;
            g.attr("transform", transform);
            setZoomLevel(+(transform.k.toFixed(2)));

            // Reposition HTML markers to stay in sync with pan/zoom
            const markers = markersRef.current?.querySelectorAll('.map-marker');
            markers?.forEach(m => {
              const bpx = parseFloat(m.dataset.basePx);
              const bpy = parseFloat(m.dataset.basePy);
              const nx = transform.applyX(bpx);
              const ny = transform.applyY(bpy);
              m.style.left = (nx / width * 100) + '%';
              m.style.top  = (ny / height * 100) + '%';
            });
          });

        zoomRef.current = zoom;
        svg.call(zoom);

      } catch (e) {
        console.error("Map load failed", e);
      }
    };

    initMap();

    return () => {
      d3.select('.d3-tooltip').remove();
    };
  }, [router]);

  return (
    <div className="world-map-wrap" style={{ position: 'relative' }}>
      <div className="world-map-inner">
        <svg
          ref={svgRef}
          id="world-map-svg"
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, opacity: 0.85, filter: 'drop-shadow(0px 8px 8px rgba(0,0,0,0.6))', cursor: 'grab' }}
        ></svg>
        <div ref={markersRef} id="map-markers"></div>
      </div>

      {/* ── Zoom Controls ─────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: '1.2rem', right: '1.2rem',
        display: 'flex', flexDirection: 'column', gap: '4px',
        zIndex: 20
      }}>
        <button
          onClick={() => handleZoom('in')}
          title="Zoom In"
          style={{
            width: '32px', height: '32px',
            background: 'rgba(12, 10, 8, 0.82)',
            border: '1px solid rgba(201,160,82,0.3)',
            borderRadius: '4px 4px 0 0',
            color: 'rgba(201,160,82,0.85)',
            fontSize: '1.1rem', lineHeight: 1,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s, border-color 0.2s',
            fontFamily: 'monospace'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,160,82,0.12)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(12, 10, 8, 0.82)'}
        >+</button>

        {/* Zoom level badge */}
        <div style={{
          width: '32px', height: '22px',
          background: 'rgba(12, 10, 8, 0.82)',
          border: '1px solid rgba(201,160,82,0.15)',
          borderTop: 'none', borderBottom: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Jost', sans-serif", fontSize: '0.5rem',
          letterSpacing: '0.05em', color: 'rgba(201,160,82,0.5)'
        }}>{Math.round(zoomLevel * 100)}%</div>

        <button
          onClick={() => handleZoom('out')}
          title="Zoom Out"
          style={{
            width: '32px', height: '32px',
            background: 'rgba(12, 10, 8, 0.82)',
            border: '1px solid rgba(201,160,82,0.3)',
            borderRadius: '0',
            color: 'rgba(201,160,82,0.85)',
            fontSize: '1.1rem', lineHeight: 1,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
            fontFamily: 'monospace'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,160,82,0.12)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(12, 10, 8, 0.82)'}
        >−</button>

        <button
          onClick={handleReset}
          title="Reset View"
          style={{
            width: '32px', height: '28px',
            background: 'rgba(12, 10, 8, 0.82)',
            border: '1px solid rgba(201,160,82,0.3)',
            borderRadius: '0 0 4px 4px',
            color: 'rgba(201,160,82,0.55)',
            fontSize: '0.55rem', lineHeight: 1,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            letterSpacing: '0.06em', fontFamily: "'Jost', sans-serif",
            textTransform: 'uppercase',
            transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,160,82,0.12)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(12, 10, 8, 0.82)'}
        >Reset</button>
      </div>
    </div>
  );
}
