"use client";
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { FEATURED_BOOKS, flagImg, slugify } from '../data/books-data';
import { useRouter } from 'next/navigation';

export default function MapComponent() {
  const svgRef = useRef(null);
  const markersRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!svgRef.current || !markersRef.current) return;
    
    // Clear previous renders (important for React strict mode / re-renders)
    d3.select(svgRef.current).selectAll("*").remove();
    d3.select('.d3-tooltip').remove();
    markersRef.current.innerHTML = '';

    const initMap = async () => {
      const svg = d3.select(svgRef.current);
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

        svg.append("g")
          .selectAll("path")
          .data(countries.features)
          .join("path")
          .attr("d", path)
          .attr("fill", "var(--card-bg)")
          .attr("stroke", "#333")
          .attr("stroke-width", 0.6)
          .style("transition", "fill 0.3s ease")
          .on("mouseover", function (event, d) {
            d3.select(this).attr("fill", "rgba(200, 130, 58, 0.1)");
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
            d3.select(this).attr("fill", "var(--card-bg)");
            tooltip.style("opacity", 0);
          })
          .on("click", function (event, d) {
            const slug = slugify(d.properties.name);
            router.push('/library#' + slug);
          });

        const D3_COORDS = {
          'IR': [53.68, 32.42], 'KR': [127.76, 35.90], 'AF': [67.70, 33.93],
          'NG': [8.67, 9.08], 'ES': [-3.74, 40.46], 'AR': [-63.61, -38.41],
          'JP': [138.25, 36.20], 'TR': [35.24, 38.96], 'RU': [105.32, 61.52],
          'CO': [-74.29, 4.57], 'BR': [-51.92, -14.23], 'IN': [78.96, 20.59],
          'CN': [103.19, 35.86], 'EG': [30.80, 26.82]
        };

        FEATURED_BOOKS.forEach(b => {
          const lonlat = D3_COORDS[b.code];
          if (!lonlat) return;
          const [px, py] = projection(lonlat);
          
          const a = document.createElement('a');
          a.style.cursor = 'pointer';
          a.onclick = () => {
            router.push(b.code === 'IR' ? '/expeditions/iran' : '/library#' + slugify(b.country));
          };
          a.className = 'map-marker';
          a.style.left = (px / width * 100) + '%';
          a.style.top = (py / height * 100) + '%';
          a.innerHTML = `<span class="marker-dot ${b.status}"></span>
          <span class="marker-tooltip">${flagImg(b.code, 'flag-icon')} ${b.title}<small>${b.country} · ${b.status === 'reading' ? 'Active' : 'Upcoming'}</small></span>`;
          markersRef.current.appendChild(a);
        });

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
    <div className="world-map-wrap">
      <div className="world-map-inner">
        <svg 
          ref={svgRef} 
          id="world-map-svg" 
          viewBox="0 0 1000 500" 
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, opacity: 0.85, filter: 'drop-shadow(0px 8px 8px rgba(0,0,0,0.6))' }}
        ></svg>
        <div ref={markersRef} id="map-markers"></div>
      </div>
    </div>
  );
}
