// ═══════════════════════════════════════════════════════
//  The Global Book Club — Shared Book Data & Utilities
// ═══════════════════════════════════════════════════════

// Flag image URL from CDN (works on all platforms, unlike emojis on Windows)
function flagUrl(code, w) { return `https://flagcdn.com/w${w||40}/${code.toLowerCase()}.png`; }
function flagImg(code, cls) { return `<img src="${flagUrl(code)}" alt="flag" class="${cls||'flag-icon'}" loading="lazy">`; }

const FEATURED_BOOKS = [
  {
    id:'touba-iran',flag:'🇮🇷',country:'Iran',code:'IR',continent:'Asia',status:'reading',
    genre:'Fiction',
    title:'Touba and the Meaning of Night',author:'Shahrnush Parsipur',year:1989,pages:368,
    movieTitle:'A Separation',movieDirector:'Asghar Farhadi',movieYear:2011,movieRuntime:123,
    speaker:'Mr. Mo',
    desc:'An epic portrait of modern Iran tracing the life of Touba, a woman navigating a rapidly changing society through political turmoil, religious exploration, and the quest for independence over eighty years.',
    why:"We chose this masterwork because it interweaves the personal resilience of a female protagonist with the historical forces that shaped modern Iran, offering a deep cultural and spiritual perspective."
  },
  {
    id:'pachinko',flag:'🇰🇷',country:'South Korea',code:'KR',continent:'Asia',status:'upcoming',
    genre:'Historical Fiction',
    title:'Pachinko',author:'Min Jin Lee',year:2017,pages:485,
    desc:'A multi-generational saga following a Korean family through colonialism, war, and migration across Korea and Japan. Four generations navigate identity, sacrifice, and survival.',
    why:"We chose Pachinko because it holds within its pages an entire century of Korean history — not told through dates or battles, but through the quiet resilience of one family."
  },
  {
    id:'kite-runner',flag:'🇦🇫',country:'Afghanistan',code:'AF',continent:'Asia',status:'upcoming',
    genre:'Fiction',title:'The Kite Runner',author:'Khaled Hosseini',year:2003,pages:372,
    desc:'A story of friendship, betrayal and redemption set against the turbulent history of Afghanistan — from the fall of the monarchy through the Soviet invasion, to the Taliban regime.',
    why:"Afghanistan exists in most of our minds as a headline, not a home. Hosseini gives it back its humanity — its kite-filled skies, its pomegranate gardens, its complicated love."
  },
  {
    id:'hundred-years',flag:'🇨🇴',country:'Colombia',code:'CO',continent:'South America',status:'upcoming',
    genre:'Magical Realism',title:'One Hundred Years of Solitude',author:'Gabriel García Márquez',year:1967,pages:417,
    desc:'The multigenerational story of the Buendía family in the fictional town of Macondo. A masterwork of magical realism weaving myth, memory, and Latin American history.',
    why:"No single book captures the soul of Latin America quite like this. García Márquez proves that myth IS history, and that the surreal is sometimes the most honest lens."
  },
  {
    id:'brothers-karamazov',flag:'🇷🇺',country:'Russia',code:'RU',continent:'Europe',status:'upcoming',
    genre:'Philosophy',title:'The Brothers Karamazov',author:'Fyodor Dostoevsky',year:1880,pages:796,
    desc:'A profound meditation on God, free will, morality, and the Russian soul — told through three brothers and the murder of their father in 19th-century Russia.',
    why:"Russia cannot be understood without Dostoevsky. We chose it because it asks questions that still have no answers — and we wanted to wrestle with them together."
  },
  {
    id:'things-fall-apart',flag:'🇳🇬',country:'Nigeria',code:'NG',continent:'Africa',status:'upcoming',
    genre:'Fiction',title:'Things Fall Apart',author:'Chinua Achebe',year:1958,pages:209,
    desc:'A landmark of African literature depicting the life of Okonkwo, a leader in an Igbo community, and the devastating arrival of European colonialism.',
    why:"This is the book that told Africa its own story back to itself — and to the world. It belongs to everyone who has ever watched a world they knew begin to dissolve."
  },
  {
    id:'alchemist',flag:'🇧🇷',country:'Brazil',code:'BR',continent:'South America',status:'upcoming',
    genre:'Fable',title:'The Alchemist',author:'Paulo Coelho',year:1988,pages:163,
    desc:"A young shepherd named Santiago travels from Spain to Egypt in search of treasure, encountering signs and wise guides who teach him to listen to his heart.",
    why:"Coelho's fable has reached 150 countries in 80 languages. It began in Brazil — and belongs to the planet."
  },
  {
    id:'soul-mountain',flag:'🇨🇳',country:'China',code:'CN',continent:'Asia',status:'upcoming',
    genre:'Autobiography',title:'Soul Mountain',author:'Gao Xingjian',year:1990,pages:510,
    desc:"A Nobel Prize-winning journey through rural China — part autobiography, part fiction, part travel journal. A meditation on freedom, solitude, and the search for self.",
    why:"China is vast, ancient, and often reduced to politics. Soul Mountain refuses that reduction. We chose it to meet a China that rarely travels outward."
  },
  {
    id:'fine-balance',flag:'🇮🇳',country:'India',code:'IN',continent:'Asia',status:'upcoming',
    genre:'Fiction',title:'A Fine Balance',author:'Rohinton Mistry',year:1995,pages:603,
    desc:"Set during India's Emergency period of the 1970s, four unlikely companions' lives intertwine in a cramped Mumbai apartment. A story of survival, hope, and fate.",
    why:"India is not one story — it is a million contradictions. Mistry holds suffering and dignity in the same hand without flinching. Uncomfortable, essential, deeply human."
  },
  {
    id:'cairo-trilogy',flag:'🇪🇬',country:'Egypt',code:'EG',continent:'Africa',status:'upcoming',
    genre:'Historical Fiction',title:'Palace Walk (Cairo Trilogy)',author:'Naguib Mahfouz',year:1956,pages:498,
    desc:"The first volume of Mahfouz's Nobel Prize-winning trilogy, set in a Cairo alley during British occupation. Three generations of Egyptian life.",
    why:"Cairo is one of the oldest cities on Earth. Mahfouz built a monument to it. We chose Palace Walk because it invites us into a courtyard, a family, an entire civilisation."
  },
  {
    id:'snow',flag:'🇹🇷',country:'Turkey',code:'TR',continent:'Asia',status:'upcoming',
    genre:'Political Fiction',title:'Snow',author:'Orhan Pamuk',year:2002,pages:436,
    desc:"A poet returns to a snowbound Turkish city, caught between Islamists and secularists, love and politics, East and West. Pamuk's most politically charged novel.",
    why:"Turkey sits at the crossroads of everything. Snow captures that impossible position with beauty and unease. Turkey's questions are the world's questions."
  },
  {
    id:'norwegian-wood',flag:'🇯🇵',country:'Japan',code:'JP',continent:'Asia',status:'community',
    genre:'Coming-of-Age',title:'Norwegian Wood',author:'Haruki Murakami',year:1987,pages:296,
    desc:"A nostalgic story of loss and coming-of-age in late-1960s Tokyo. Toru Watanabe looks back on student days, friendship, and love for two very different women.",
    why:'Suggested by Aiko: "Murakami writes loneliness in a way that makes you feel less alone. Norwegian Wood is the Japan beneath Japan."'
  }
];

// Map positions (% coordinates on equirectangular projection)
const MAP_COORDS = {
  KR:{x:82.5,y:32},AF:{x:66.5,y:33.5},CO:{x:26.5,y:53.5},RU:{x:57.5,y:19.5},IR:{x:62,y:37},
  NG:{x:49,y:50.5},BR:{x:34,y:67},CN:{x:79.5,y:30},IN:{x:68.5,y:37.5},
  EG:{x:56,y:36.5},TR:{x:56.5,y:30},JP:{x:86,y:32.5},BY:{x:55,y:21},
  AL:{x:52,y:33},DZ:{x:47.5,y:38},AD:{x:46.5,y:31},AO:{x:50,y:62},
  AG:{x:27.5,y:47},AR:{x:26,y:76},AM:{x:59,y:33},AU:{x:82,y:72},
  AT:{x:50,y:29.5},AZ:{x:60,y:33},BS:{x:23.5,y:43},BH:{x:60.5,y:41},
  BD:{x:72,y:42},BB:{x:28.5,y:49},BE:{x:48,y:28.5},BZ:{x:21.5,y:47.5},
  BJ:{x:47.5,y:52},BT:{x:72.5,y:40},BO:{x:26.5,y:65},BA:{x:51.5,y:31},
  BW:{x:52,y:68},BN:{x:78,y:53},BG:{x:53,y:31},BF:{x:46.5,y:49},
  BI:{x:54,y:57},KH:{x:76,y:49},CM:{x:49,y:53},CA:{x:19,y:17},
  CV:{x:41,y:47.5},CF:{x:51.5,y:53},TD:{x:51.5,y:47},CL:{x:23.5,y:76},
  CU:{x:23,y:44},CY:{x:55,y:35},CZ:{x:50.5,y:28.5},DK:{x:48.5,y:25},
  DJ:{x:58,y:49},DM:{x:28,y:47.5},DO:{x:24.5,y:46},EC:{x:23,y:57},
  SV:{x:21,y:49},GQ:{x:48.5,y:55},ER:{x:57,y:47},EE:{x:53,y:24},
  ET:{x:56.5,y:51},FJ:{x:95,y:62},FI:{x:53,y:19},FR:{x:47,y:29.5},
  GA:{x:49,y:57.5},GM:{x:43,y:49},GE:{x:58,y:31.5},DE:{x:49.5,y:28},
  GH:{x:46,y:52},GR:{x:53,y:33},GD:{x:28,y:49},GT:{x:20.5,y:47.5},
  GN:{x:44,y:50.5},GW:{x:43.5,y:49.5},GY:{x:28,y:53},HT:{x:24,y:46},
  HN:{x:21,y:47.5},HU:{x:51.5,y:29.5},IS:{x:42,y:19},ID:{x:78.5,y:57},
  IR:{x:62,y:37},IQ:{x:59,y:36},IE:{x:44.5,y:27},IL:{x:55.5,y:37},
  IT:{x:49.5,y:31},JM:{x:23,y:46.5},JO:{x:56,y:37.5},KZ:{x:65,y:28},
  KE:{x:56,y:57},KI:{x:95.5,y:55},KW:{x:60,y:38},KG:{x:67,y:31},
  LA:{x:75,y:46},LV:{x:53,y:25},LB:{x:55.5,y:36},LS:{x:54,y:72},
  LR:{x:44.5,y:52},LY:{x:50.5,y:41},LI:{x:48.5,y:29.5},LT:{x:53,y:25.5},
  LU:{x:47.5,y:28.5},MK:{x:52.5,y:32},MG:{x:59,y:66},MW:{x:55.5,y:64},
  MY:{x:76.5,y:53},MV:{x:67.5,y:53},ML:{x:46,y:47.5},MT:{x:50,y:35},
  MH:{x:94,y:52},MR:{x:44.5,y:45},MU:{x:62,y:67},MX:{x:18.5,y:43.5},
  FM:{x:90,y:53},MD:{x:54,y:29.5},MC:{x:48,y:31},MN:{x:75,y:27},
  ME:{x:51.5,y:31.5},MA:{x:45,y:37},MZ:{x:56,y:66},MM:{x:74,y:44},
  NA:{x:50.5,y:69},NR:{x:93,y:56},NP:{x:70.5,y:40},NL:{x:47.5,y:27.5},
  NZ:{x:94,y:76},NI:{x:21.5,y:49},NE:{x:48.5,y:47},KP:{x:82,y:33},
  NO:{x:48.5,y:20},OM:{x:62,y:43},PK:{x:66,y:38},PW:{x:83.5,y:53},
  PS:{x:55.5,y:37},PA:{x:23,y:51},PG:{x:88,y:58},PY:{x:27,y:69},
  PE:{x:23,y:62},PH:{x:82,y:49},PL:{x:51.5,y:27.5},PT:{x:44,y:33},
  QA:{x:60.5,y:41.5},RO:{x:53,y:30},RW:{x:54.5,y:57},KN:{x:27.5,y:47},
  LC:{x:28,y:48},VC:{x:28,y:49},WS:{x:96,y:60},SM:{x:49.5,y:31.5},
  ST:{x:47.5,y:56},SA:{x:59,y:42},SN:{x:43.5,y:48.5},RS:{x:52,y:31},
  SC:{x:62.5,y:58},SL:{x:44,y:51},SG:{x:76.5,y:55.5},SK:{x:51.5,y:29},
  SI:{x:50.5,y:30},SB:{x:91,y:59},SO:{x:59,y:53},ZA:{x:53,y:72},
  SS:{x:54.5,y:52},ES:{x:45.5,y:33},LK:{x:69.5,y:52},SD:{x:54.5,y:47},
  SR:{x:29,y:53.5},SZ:{x:55,y:71},SE:{x:50,y:20},CH:{x:48.5,y:29.5},
  SY:{x:57,y:35.5},TW:{x:82,y:43.5},TJ:{x:66,y:33},TZ:{x:55,y:59},
  TH:{x:75.5,y:47.5},TG:{x:47,y:52},TO:{x:96.5,y:66},TT:{x:28,y:50},
  TN:{x:48.5,y:35},TM:{x:63.5,y:33},TV:{x:95.5,y:59},UG:{x:55,y:56},
  UA:{x:54,y:28.5},AE:{x:62,y:42},GB:{x:46,y:27},US:{x:17.5,y:33},
  UY:{x:27.5,y:76},UZ:{x:64.5,y:31},VU:{x:93,y:63},VA:{x:49.5,y:31.5},
  VE:{x:26,y:51},VN:{x:77,y:47},YE:{x:60,y:47},ZM:{x:54,y:64},ZW:{x:54.5,y:67}
};

// — Extended Library Data —
const LIBRARY_BOOKS = [
["Afghanistan","AF","Asia",[["A Thousand Rooms of Dream and Fear","Atiq Rahimi"],["The Kite Runner","Khaled Hosseini"],["A Thousand Splendid Suns","Khaled Hosseini"],["The Patience Stone","Atiq Rahimi"],["Waiting for the Taliban","Anna Badkhen"],["The Photographer","Emmanuel Guibert"],["Behind the Burqa","Batya Swift Yasgur"]]],
["Albania","AL","Europe",[["The Palace of Dreams","Ismail Kadare"],["Broken April","Ismail Kadare"],["The Loser","Fatos Kongoli"],["Sworn Virgin","Elvira Dones"]]],
["Algeria","DZ","Africa",[["The Sexual Life of an Islamist in Paris","Leïla Marouane"],["So Vast the Prison","Assia Djebar"],["The German Mujahid","Boualem Sansal"],["The Attack","Yasmina Khadra"],["The Lovers of Algeria","Anouar Benmalek"]]],
["Andorra","AD","Europe",[["The Teacher of Cheops","Albert Salvadó"]]],
["Angola","AO","Africa",[["My Father's Wives","José Eduardo Agualusa"],["The Return of the Water Spirit","Pepetela"],["Good Morning Comrades","Ondjaki"],["The Book of Chameleons","José Eduardo Agualusa"]]],
["Antigua and Barbuda","AG","Caribbean",[["Lucy","Jamaica Kincaid"],["Annie John","Jamaica Kincaid"],["Unburnable","Marie-Elena John"]]],
["Argentina","AR","South America",[["Seconds Out","Martin Kohan"],["How I Became a Nun","César Aira"],["The Tunnel","Ernesto Sábato"],["The Invention of Morel","Adolfo Bioy Casares"],["Hopscotch","Julio Cortázar"],["Fever Dream","Samanta Schweblin"]]],
["Armenia","AM","Asia",[["Bringing Ararat","Armand Inezian"],["Armenian Golgotha","Grigoris Balakian"],["Three Apples Fell from the Sky","Narine Abgaryan"]]],
["Australia","AU","Oceania",[["Cloudstreet","Tim Winton"],["The Book Thief","Markus Zusak"],["The Boat","Nam Le"],["The White Earth","Andrew McGahan"],["Lovesong","Alex Miller"]]],
["Austria","AT","Europe",[["The Torch in my Ear","Elias Canetti"],["Extinction","Thomas Bernhard"],["Splithead","Julya Rabinovich"],["A Whole Life","Robert Seethaler"]]],
["Azerbaijan","AZ","Asia",[["Magnolia","Gioulzar Akhmedova"],["Ali and Nino","Kurban Said"]]],
["The Bahamas","BS","Caribbean",[["God's Angry Babies","Ian Strachan"]]],
["Bahrain","BH","Asia",[["Quixotiq","Ali Al Saeed"]]],
["Bangladesh","BD","Asia",[["Shame","Taslima Nasrin"],["The Good Muslim","Tahmima Anam"],["The Laughter of a Slave","Shawkat Osman"]]],
["Barbados","BB","Caribbean",[["Redemption in Indigo","Karen Lord"],["Flickering Shadows","Agymah Kamau"]]],
["Belarus","BY","Europe",[["The Sun City of Dreams","Artur Klinov"],["King Stakh's Wild Hunt","Uladzimir Karatkievich"],["Voices from Chernobyl","Svetlana Alexievich"],["The Master and Margarita","Mikhail Bulgakov"]]],
["Belgium","BE","Europe",[["The Adventures of Tintin","Hergé"],["The Guard","Peter Terrin"],["The Angel Maker","Stefan Brijs"],["The Misfortunates","Dimitri Verhulst"],["I Who Have Never Known Men","Jacqueline Harpman"]]],
["Belize","BZ","North America",[["On Heroes, Lizards and Passion","Zoila Ellis"]]],
["Benin","BJ","Africa",[["Stories We Tell Each Other","Rashidah Ismaili Abubakr"]]],
["Bhutan","BT","Asia",[["The Circle of Karma","Kunzang Choden"],["The Hero with a Thousand Eyes","Karma Ura"]]],
["Bolivia","BO","South America",[["American Visa","Juan de Recacoechea"],["Our Dead World","Liliana Colanzi"],["Sweet Blood","Giovanna Rivero"]]],
["Bosnia and Herzegovina","BA","Europe",[["Zlata's Diary","Zlata Filipovic"],["The Bridge on the Drina","Ivo Andric"],["Death and the Dervish","Meša Selimović"]]],
["Botswana","BW","Africa",[["A Question of Power","Bessie Head"],["The Lion Children","Angus McNeice"]]],
["Brazil","BR","South America",[["The Alchemist","Paulo Coelho"],["Dom Casmurro","Machado de Assis"],["Budapest","Chico Buarque"],["Agua Viva","Clarice Lispector"],["The Body Snatcher","Patrícia Melo"]]],
["Brunei","BN","Asia",[["Four Kings","Christopher Sun"],["The Forlorn Adventure","Amir Falique"]]],
["Bulgaria","BG","Europe",[["The Tongue Set Free","Elias Canetti"],["Natural Novel","Georgi Gospodinov"],["Street Without a Name","Kapka Kassabova"],["Time of Parting","Anton Donchev"]]],
["Burkina Faso","BF","Africa",[["The Parachute Drop","Nobert Zongo"]]],
["Burundi","BI","Africa",[["Baho!","Roland Rugero"],["Weep Not, Refugee","Marie-Therese Toyi"]]],
["Cambodia","KH","Asia",[["In the Shadow of the Banyan","Vaddey Ratner"],["Unpolished Gem","Alice Pung"]]],
["Cameroon","CM","Africa",[["The Poor Christ of Bomba","Mongo Beti"],["Mission to Kala","Mongo Beti"]]],
["Canada","CA","North America",[["Fugitive Pieces","Anne Michaels"],["Green Grass, Running Water","Thomas King"],["Late Nights on Air","Elizabeth Hay"],["In the Skin of a Lion","Michael Ondaatje"],["Galore","Michael Crummey"]]],
["Cape Verde","CV","Africa",[["The Last Will & Testament of Senhor da Silva Araújo","Germano Almeida"]]],
["Central African Republic","CF","Africa",[["African Tales","Polly Strong (ed.)"]]],
["Chad","TD","Africa",[["Told by Starlight in Chad","Joseph Brahim Seid"]]],
["Chile","CL","South America",[["The Savage Detectives","Roberto Bolaño"],["The House of the Spirits","Isabel Allende"],["Bonsai","Alejandro Zambra"],["Seeing Red","Lina Meruane"]]],
["China","CN","Asia",[["Soul Mountain","Gao Xingjian"],["Wolf Totem","Jian Rong"],["Dream of the Red Chamber","Cao Xuequin"],["The Garlic Ballads","Mo Yan"],["Rouge Street","Shuang Xuetao"],["The Good Women of China","Xue Xinran"]]],
["Colombia","CO","South America",[["One Hundred Years of Solitude","Gabriel García Márquez"],["The Armies","Evelio Rosero"],["Delirium","Laura Restrepo"],["The Informers","Juan Gabriel Vasquez"]]],
["Comoros","KM","Africa",[["The Kafir of Karthala","Mohammed Toihiri"]]],
["Congo, Democratic Republic of","CD","Africa",[["Full Circle","Frederick Yamusangie"]]],
["Congo, Republic of","CG","Africa",[["Johnny Mad Dog","Emmanuel Dongala"],["The Antipeople","Sony Lab'ou Tansi"],["Letter to Jimmy","Alain Mabanckou"]]],
["Costa Rica","CR","North America",[["The Madwoman of Gandoca","Anacristina Rossi"],["Cadence of the Moon","Oscar Nunez Olivas"]]],
["Côte d'Ivoire","CI","Africa",[["Climbié","Bernard Dadié"],["Allah is not Obliged","Ahmadou Kourouma"],["Standing Heavy","GauZ'"]]],
["Croatia","HR","Europe",[["On the Edge of Reason","Miroslav Krleža"],["The Ministry of Pain","Dubravka Ugrĕsic"],["Our Man in Iraq","Robert Perišič"]]],
["Cuba","CU","Caribbean",[["Dancing to Almendra","Mayra Montero"],["The Man Who Loved Dogs","Leonardo Padura"],["Dogeaters","Jessica Hagedorn"]]],
["Cyprus","CY","Europe",[["A Watermelon, a Fish and a Bible","Christy Lefteri"]]],
["Czech Republic","CZ","Europe",[["Too Loud a Solitude","Bohumil Hrabal"],["The Engineer of Human Souls","Josef Škvorecký"],["The Devil's Workshop","Jáchym Topol"]]],
["Denmark","DK","Europe",[["Exile","Jakob Ejersbo"],["The Exception","Christian Jungersen"],["Smilla's Sense of Snow","Peter Høeg"]]],
["Djibouti","DJ","Africa",[["In the United States of Africa","Abdourahman Waberi"],["Passage of Tears","Abdourahman Waberi"]]],
["Dominica","DM","Caribbean",[["The Orchid House","Phyllis Shand Allfrey"],["Wide Sargasso Sea","Jean Rhys"]]],
["Dominican Republic","DO","Caribbean",[["The Brief Wondrous Life of Oscar Wao","Junot Diaz"],["Tentacle","Rita Indiana"]]],
["East Timor","TL","Asia",[["The Crossing","Luis Cardoso"]]],
["Ecuador","EC","South America",[["Huasipungo","Jorge Icaza"],["The Potbellied Virgin","Alicia Yáñez Cossío"]]],
["Egypt","EG","Africa",[["Palace Walk (Cairo Trilogy)","Naguib Mahfouz"],["The Map of Love","Ahdaf Soueif"],["The Yacoubian Building","Alaa Al Aswany"],["Midaq Alley","Naguib Mahfouz"],["The Queue","Basma Abdel Aziz"]]],
["El Salvador","SV","North America",[["Senselessness","Horacio Castellanos Moya"]]],
["Equatorial Guinea","GQ","Africa",[["By Night the Mountain Burns","Juan Tomás Ávila Laurel"],["La Bastarda","Trifonia Melibea Obono"]]],
["Eritrea","ER","Africa",[["Heart of Fire","Senait Mehari"],["The Consequences of Love","Sulaiman Addonia"]]],
["Estonia","EE","Europe",[["Professor Martens' Departure","Jaan Kross"],["The Beauty of History","Viivi Luik"]]],
["Ethiopia","ET","Africa",[["Beneath the Lion's Gaze","Maaza Mengiste"],["Cutting for Stone","Abraham Verghese"]]],
["Fiji","FJ","Oceania",[["Kava in the Blood","Peter Thomson"],["Kisses in the Nederends","Epeli Hau'ofa"]]],
["Finland","FI","Europe",[["The Year of the Hare","Arto Paasilinna"],["Purge","Sofi Oksanen"],["Memory of Water","Emmi Itäranta"]]],
["France","FR","Europe",[["Life: a User's Manual","Georges Perec"],["Exercises in Style","Raymond Queneau"],["A Novel Bookstore","Laurence Cossé"],["The French Art of War","Alexis Jenni"]]],
["Gabon","GA","Africa",[["Mema","Daniel Mengara"]]],
["The Gambia","GM","Africa",[["Reading the Ceiling","Dayo Forster"]]],
["Georgia","GE","Asia",[["The Eighth Life: (for Brilka)","Nino Haratischvili"],["Data Tutashkhia","Cabua Amirejibi"]]],
["Germany","DE","Europe",[["The Tin Drum","Günter Grass"],["Alone in Berlin","Hans Fallada"],["Siddhartha","Herman Hesse"],["Memoirs of a Polar Bear","Yoko Tawada"],["Higher Ground","Anke Stelling"]]],
["Ghana","GH","Africa",[["The Beautyful Ones Are Not Yet Born","Ayi Kwei Armah"]]],
["Greece","GR","Europe",[["Freedom or Death","Nikos Kazantzakis"],["The Last Temptation","Nikos Kazantzakis"]]],
["Grenada","GD","Caribbean",[["The Ladies are Upstairs","Merle Collins"]]],
["Guatemala","GT","North America",[["The President","Miguel Angel Asturias"],["The Polish Boxer","Eduardo Halfon"]]],
["Guinea","GN","Africa",[["The Radiance of the King","Camara Laye"]]],
["Guinea-Bissau","GW","Africa",[["The Ultimate Tragedy","Abdulai Silá"]]],
["Guyana","GY","South America",[["Buxton Spice","Oonya Kempadoo"]]],
["Haiti","HT","Caribbean",[["The Farming of the Bones","Edwidge Danticat"],["How to Make Love to a Negro without Getting Tired","Dany Laferriere"]]],
["Honduras","HN","North America",[["Points of Light","Guillermo Yuscaran"]]],
["Hungary","HU","Europe",[["Embers","Sándor Márai"],["Skylark","Dezső Kosztolányi"],["Journey by Moonlight","Antal Szerb"],["Fatelessness","Imre Kertész"]]],
["Iceland","IS","Europe",[["Jar City","Arnaldur Indridason"],["The Atom Station","Halldór Laxness"],["The Greenhouse","Auður A Ólafsdóttir"]]],
["India","IN","Asia",[["A Fine Balance","Rohinton Mistry"],["Maximum City","Suketu Mehta"],["Malgudi Days","RK Narayan"],["Train to Pakistan","Kushwant Singh"],["A Suitable Boy","Vikram Seth"],["Ghachar Ghochar","Vivek Shanbhag"]]],
["Indonesia","ID","Asia",[["This Earth of Mankind","Pramoedya Ananta Toer"],["The Rainbow Troops","Andrea Hirata"],["Man Tiger","Eka Kurniawan"],["Saman","Ayu Utami"]]],
["Iran","IR","Asia",[["We are Iran","Nasrin Alavi"],["Touba and the Meaning of Night","Shahrnush Parsipur"],["The Colonel","Mahmoud Dowlatabadi"]]],
["Iraq","IQ","Asia",[["An Iraqi in Paris","Samuel Shimon"],["The Madman of Freedom Square","Hassan Blasim"],["Thirsty River","Rodaan Al Galidi"]]],
["Ireland","IE","Europe",[["Ulysses","James Joyce"],["The Third Policeman","Flann O'Brien"],["The Secret Scripture","Sebastian Barry"]]],
["Israel","IL","Asia",[["To the End of the Land","David Grossman"],["A Tale of Love and Darkness","Amos Oz"],["Blooms of Darkness","Aharon Appelfeld"]]],
["Italy","IT","Europe",[["Gomorrah","Roberto Saviano"],["My Brilliant Friend","Elena Ferrante"],["The Leopard","Giuseppe Tomasi di Lampedusa"],["The Tartar Steppe","Dino Buzzati"]]],
["Jamaica","JM","Caribbean",[["The Book of Night Women","Marlon James"],["The Pirate's Daughter","Margaret Cezair-Thompson"]]],
["Japan","JP","Asia",[["Norwegian Wood","Haruki Murakami"],["Kafka on the Shore","Haruki Murakami"],["Snow Country","Yasunari Kawabata"],["Breasts and Eggs","Mieko Kawakami"],["I am a Cat","Natsume Sōseki"]]],
["Jordan","JO","Asia",[["Time of White Horses","Ibrahim Nasrallah"],["Cities of Salt","Abdulrahman Munif"]]],
["Kazakhstan","KZ","Asia",[["The Silent Steppe","Mukhamet Shayakhmetov"],["Nomads","Ilyas Esenberlin"]]],
["Kenya","KE","Africa",[["A Grain of Wheat","Ngũgĩ wa Thiong'o"],["Wizard of the Crow","Ngũgĩ wa Thiong'o"],["Dust","Yvonne Adhiambo Owuor"]]],
["Kuwait","KW","Asia",[["Pearling in the Arabian Gulf","Saif Marzooq al-Shamlan"]]],
["Kyrgyzstan","KG","Asia",[["Jamilia","Chinghiz Aitmatov"],["The Day Lasts More than a Hundred Years","Chinghiz Aitmatov"]]],
["Laos","LA","Asia",[["Mother's Beloved","Outhine Bounyavong"]]],
["Latvia","LV","Europe",[["The Free World","David Bezmozgis"],["A Woman in Amber","Agate Nesaule"]]],
["Lebanon","LB","Asia",[["I Killed Scheherazade","Joumana Haddad"],["Gate of the Sun","Elias Khoury"],["Samarkand","Amin Maalouf"]]],
["Lesotho","LS","Africa",[["Chaka","Thomas Mofolo"]]],
["Liberia","LR","Africa",[["The House at Sugar Beach","Helene Cooper"]]],
["Libya","LY","Africa",[["In the Country of Men","Hisham Matar"],["Gold Dust","Ibrahim Al-Khoni"]]],
["Liechtenstein","LI","Europe",[["Seven Years in Tibet","Heinrich Harrer"]]],
["Lithuania","LT","Europe",[["Vilnius Poker","Ricardas Gavelis"],["Forest of the Gods","Balys Sruoga"]]],
["Luxembourg","LU","Europe",[["Amateur","Jean Back"]]],
["North Macedonia","MK","Europe",[["Sigmund Freud's Sister","Goce Smilevski"]]],
["Madagascar","MG","Africa",[["Beyond the Rice Fields","Naivo"]]],
["Malawi","MW","Africa",[["The Jive Talker","Samson Kambalu"]]],
["Malaysia","MY","Asia",[["Ripples and Other Stories","Shih-Li Kow"],["This End of The Rainbow","Adibah Amin"]]],
["Maldives","MV","Asia",[["Dhon Hiyala and Ali Fulhu","Abdullah Sadiq"]]],
["Mali","ML","Africa",[["The Strange Destiny of Wangrin","Amadou Hampâté Bâ"],["Bound to Violence","Yambo Ouloguem"]]],
["Malta","MT","Europe",[["Happy Weekend","Immanuel Mifsud"]]],
["Mauritania","MR","Africa",[["The Desert and the Drum","Mbarek Ould Beyrouk"]]],
["Mauritius","MU","Africa",[["The Last Brother","Nathacha Appanah"]]],
["Mexico","MX","North America",[["Like Water for Chocolate","Laura Esquivel"],["The Labyrinth of Solitude","Octavio Paz"],["Pedro Paramo","Juan Rulfo"],["Hurricane Season","Fernanda Melchor"]]],
["Moldova","MD","Europe",[["The Good Life Elsewhere","Vladimir Lorchenkov"]]],
["Mongolia","MN","Asia",[["The Blue Sky","Galsan Tschinag"]]],
["Montenegro","ME","Europe",[["The Mountain Wreath","Petar II Petrović-Njegoš"]]],
["Morocco","MA","Africa",[["The Sacred Night","Tahar Ben Jelloun"],["This Blinding Absence of Light","Tahar Ben Jelloun"],["For Bread Alone","Muhammad Shukri"]]],
["Mozambique","MZ","Africa",[["The Sleepwalking Land","Mia Couto"],["Niketche","Paulina Chiziane"]]],
["Myanmar","MM","Asia",[["Smile as they Bow","Nu Nu Yi Inwa"]]],
["Namibia","NA","Africa",[["The Purple Violet of Oshaantu","Neshani Andreas"]]],
["Nepal","NP","Asia",[["Buddha's Orphans","Samrat Upadhyay"],["Blue Mimosa","Parijat"],["The Gurkha's Daughter","Prajwal Parajuly"]]],
["Netherlands","NL","Europe",[["The Discovery of Heaven","Harry Mulisch"],["The Twin","Gerbrand Bakker"],["The House of the Mosque","Kader Abdolah"],["The Evenings","Gerard Reve"],["Dear Mr M","Herman Koch"]]],
["New Zealand","NZ","Oceania",[["The Bone People","Keri Hulme"],["Mr Pip","Lloyd Jones"],["Once Were Warriors","Alan Duff"],["The Luminaries","Eleanor Catton"]]],
["Nicaragua","NI","North America",[["Infinity in the Palm of her Hand","Gioconda Belli"]]],
["Niger","NE","Africa",[["The Epic of Askia Mohammed","Nouhou Malio"]]],
["Nigeria","NG","Africa",[["Things Fall Apart","Chinua Achebe"],["Americanah","Chimamanda Ngozi Adichie"],["Half of a Yellow Sun","Chimamanda Ngozi Adichie"],["The Secret Lives of Baba Segi's Wives","Lola Shoneyin"]]],
["North Korea","KP","Asia",[["My Life and Faith","Ri In Mo"]]],
["Norway","NO","Europe",[["My Struggle","Karl Ove Knausgaard"],["Hunger","Knut Hamsun"],["Out Stealing Horses","Per Petterson"],["The Ice Palace","Tarjei Vesaas"]]],
["Oman","OM","Asia",[["Behind the Veil in Arabia","Unni Wikan"]]],
["Pakistan","PK","Asia",[["The Reluctant Fundamentalist","Mohsin Hamid"],["The Wandering Falcon","Jamil Ahmad"],["Kartography","Kamila Shamsie"],["Burnt Shadows","Kamila Shamsie"]]],
["Palestine","PS","Asia",[["Tasting the Sky","Ibtisam Barakat"],["Mornings in Jenin","Susan Abulhawa"],["Wild Thorns","Sahar Khalifeh"]]],
["Panama","PA","North America",[["The Golden Horse","Juan David Morgan"]]],
["Papua New Guinea","PG","Oceania",[["The Crocodile","Vincent Eri"]]],
["Paraguay","PY","South America",[["I, the Supreme","Augusto Roa Bastos"]]],
["Peru","PE","South America",[["Death in the Andes","Mario Vargas Llosa"],["Aunt Julia and the Scriptwriter","Mario Vargas Llosa"]]],
["Philippines","PH","Asia",[["Illustrado","Miguel Syjuco"],["Dogeaters","Jessica Hagedorn"],["State of War","Ninotchka Rosca"]]],
["Poland","PL","Europe",[["Primeval and Other Times","Olga Tokarczuk"],["Flights","Olga Tokarczuk"],["Stone upon Stone","Wiesław Myśliwski"],["Entanglement","Zygmunt Miloszewski"]]],
["Portugal","PT","Europe",[["Blindness","José Saramago"],["The Year of the Death of Ricardo Reis","José Saramago"]]],
["Qatar","QA","Asia",[["The Corsair","Abdul Aziz Al Mahmoud"]]],
["Romania","RO","Europe",[["The Passport","Herta Müller"],["The Baiut Alley Lads","Filip and Matei Florian"]]],
["Russia","RU","Europe",[["The Brothers Karamazov","Fyodor Dostoevsky"],["One Day in the Life of Ivan Denisovich","Aleksandr Solzhenitsyn"],["Anna Karenina","Leo Tolstoy"],["The Master and Margarita","Mikhail Bulgakov"],["Zuleikha","Guzel Yakhina"]]],
["Rwanda","RW","Africa",[["We Wish to Inform You...","Philip Gourevitch"],["Small Country","Gaël Faye"]]],
["Saint Lucia","LC","Caribbean",[["Omeros","Derek Walcott"]]],
["Samoa","WS","Oceania",[["Where We Once Belonged","Sia Figiel"],["Sons for the Return Home","Albert Wendt"]]],
["Saudi Arabia","SA","Asia",[["Girls of Riyadh","Rajaa Al-Sanea"],["Cities of Salt","Abdul Rahman Munif"]]],
["Senegal","SN","Africa",[["So Long a Letter","Mariama Bâ"],["The Hidden Notebooks","Boubacar Boris Diop"]]],
["Serbia","RS","Europe",[["Dictionary of the Khazars","Milorad Pavic"],["Bait","David Albahari"]]],
["Sierra Leone","SL","Africa",[["The Memory of Love","Aminatta Forna"],["A Long Way Gone","Ishmael Beah"]]],
["Singapore","SG","Asia",[["Fistful of Colours","Su-Chen Christine Lim"]]],
["Slovakia","SK","Europe",[["Rivers of Babylon","Peter Pišťanek"],["Seeing People Off","Jana Beňová"]]],
["Slovenia","SI","Europe",[["Alamut","Vladimir Bartol"],["Fužine Blues","Andrej Skubic"]]],
["Solomon Islands","SB","Oceania",[["The Alternative","John Saunana"]]],
["Somalia","SO","Africa",[["Secrets","Nuruddin Farah"],["Sweet and Sour Milk","Nuruddin Farah"]]],
["South Africa","ZA","Africa",[["Cry, the Beloved Country","Alan Paton"],["The Long Walk to Freedom","Nelson Mandela"],["Fiela's Child","Dalene Matthee"],["The Power of One","Bryce Courtenay"]]],
["South Korea","KR","Asia",[["Pachinko","Min Jin Lee"],["The Vegetarian","Han Kang"],["Please Look After Mom","Shin Kyung-Sook"]]],
["South Sudan","SS","Africa",[["To Forgive is Divine Not Human","Julia Duany"]]],
["Spain","ES","Europe",[["Don Quixote","Miguel de Cervantes"],["The Shadow of the Wind","Carlos Ruiz Zafón"],["Soldiers of Salamis","Javier Cercas"],["Boulder","Eva Baltasar"]]],
["Sri Lanka","LK","Asia",[["Reef","Romesh Gunesekera"],["Chinaman","Shehan Karunatilaka"],["The Jam Fruit Tree","Carl Muller"]]],
["Sudan","SD","Africa",[["Season of Migration to the North","Tayeb Salih"],["Minaret","Leila Aboulela"]]],
["Suriname","SR","South America",[["The Cost of Sugar","Cynthia Mcleod"]]],
["Eswatini","SZ","Africa",[["Weeding the Flowerbeds","Sarah Mkhonza"]]],
["Sweden","SE","Europe",[["Doctor Glas","Hjalmar Soderberg"],["Let the Right One In","John Ajvide Lindqvist"],["The Hundred-Year-Old Man...","Jonas Jonasson"],["Wilful Disregard","Lena Andersson"]]],
["Switzerland","CH","Europe",[["The Pledge","Friedrich Dürrenmatt"],["A Village Romeo and Juliet","Gottfried Keller"],["Beauty on Earth","Charles-Ferdinand Ramuz"]]],
["Syria","SY","Asia",[["Damascus Nights","Rafik Schami"],["In Praise of Hatred","Khaled Khalifa"],["Breaking Knees","Zakaria Tamer"]]],
["Taiwan","TW","Asia",[["Crystal Boys","Pai Hsien-yung"],["An Excess Male","Maggie Shen King"]]],
["Tajikistan","TJ","Asia",[["Hurramabad","Andrei Volos"]]],
["Tanzania","TZ","Africa",[["Desertion","Abdulrazak Gurnah"],["Blood on Our Land","Ismael Mbise"]]],
["Thailand","TH","Asia",[["The Judgement","Chart Korbjitti"],["A Child of the Northeast","Kampoon Boontawee"]]],
["Togo","TG","Africa",[["An African in Greenland","Tété-Michel Kpomassie"]]],
["Tonga","TO","Oceania",[["A Providence of War","Joshua Taumoefolau"]]],
["Trinidad and Tobago","TT","Caribbean",[["A House for Mr Biswas","VS Naipaul"],["The White Woman on the Green Bicycle","Monique Roffey"]]],
["Tunisia","TN","Africa",[["The Scents of Marie-Claire","Habib Selmi"],["A Tunisian Tale","Hassouna Mosbahi"]]],
["Turkey","TR","Asia",[["Snow","Orhan Pamuk"],["The Forty Rules of Love","Elif Shafak"],["Dear Shameless Death","Latife Tekin"],["The Time Regulation Institute","Ahmet Hamdi Tanpinar"]]],
["Turkmenistan","TM","Asia",[["Unknown Sands","John Kropf"],["The Tale of Aypi","Ak Welsapar"]]],
["Uganda","UG","Africa",[["Abyssinian Chronicles","Moses Isegawa"],["Kintu","Jennifer Nansubuga Makumbi"],["The First Woman","Jennifer Nansubuga Makumbi"]]],
["Ukraine","UA","Europe",[["Death and the Penguin","Andrey Kurkov"],["Life Went on Anyway","Oleg Sentsov"]]],
["United Arab Emirates","AE","Asia",[["The Sand Fish","Maha Gargash"],["Temporary People","Deepak Unnikrishnan"]]],
["United Kingdom","GB","Europe",[["The Remains of the Day","Kazuo Ishiguro"],["Swimming Home","Deborah Levy"],["The Good Immigrant","Nikesh Shukla (ed.)"]]],
["United States","US","North America",[["American Gods","Neil Gaiman"],["The Poisonwood Bible","Barbara Kingsolver"],["The Killer Angels","Michael Shaara"],["Fear and Loathing in Las Vegas","Hunter S Thompson"]]],
["Uruguay","UY","South America",[["The Shipyard","Juan Carlos Onetti"],["Lands of Memory","Felisberto Hernández"]]],
["Uzbekistan","UZ","Asia",[["The Railway","Hamid Ismailov"],["The Dancer from Khiva","Bibish"]]],
["Vanuatu","VU","Oceania",[["Laef Blong Mi","Regis Seva Regenvanu"]]],
["Venezuela","VE","South America",[["The Sickness","Alberto Barrera Tyszka"]]],
["Vietnam","VN","Asia",[["The Sorrow of War","Bao Ninh"],["Paradise of the Blind","Duong Thu Huong"]]],
["Yemen","YE","Asia",[["A Land without Jasmine","Wajdi al-Ahdal"],["The Hostage","Zayd Mutee' Dammaj"]]],
["Zambia","ZM","Africa",[["The Old Drift","Namwali Serpell"],["A Cowrie of Hope","Binwell Sinyangwe"]]],
["Zimbabwe","ZW","Africa",[["Nervous Conditions","Tsitsi Dangarembga"],["Harare North","Brian Chikwava"],["The Hairdresser of Harare","Tendai Huchu"]]]
];

// — Utils —
function slugify(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');}

function getBookMetadata(title, author) {
  const featured = FEATURED_BOOKS.find(fb => fb.title === title);
  if (featured) return { genre: featured.genre || 'Fiction', pages: featured.pages || 300 };
  
  const GENRES = ['Fiction', 'Historical Fiction', 'Magical Realism', 'Philosophy', 'Political Fiction', 'Coming-of-Age', 'Satire', 'Fable', 'Autobiography', 'Non-Fiction'];
  let hash = 0; for(let j=0; j<title.length; j++) hash += title.charCodeAt(j);
  return {
    genre: GENRES[hash % GENRES.length],
    pages: 150 + (hash * 31 % 700)
  };
}

const ALL_DISCOVERABLE_BOOKS = [
  ...FEATURED_BOOKS,
  ...LIBRARY_BOOKS.flatMap(c => c[3].map(b => {
    if (FEATURED_BOOKS.some(fb => fb.title === b[0])) return null;
    const meta = getBookMetadata(b[0], b[1]);
    return {
      title: b[0], author: b[1], country: c[0], code: c[1],
      continent: c[2], genre: meta.genre, pages: meta.pages, status: 'library'
    };
  })).filter(Boolean)
];

function codeToFlag(code){
  return String.fromCodePoint(...[...code.toUpperCase()].map(c=>0x1F1E6+c.charCodeAt(0)-65));
}

function statusLabel(s){
  const m={reading:['Currently Reading','status-reading'],completed:['Completed','status-done'],
    upcoming:['Upcoming','status-upcoming'],community:['Community Pick','status-community'],
    library:['In Library','status-library']};
  return m[s]||['In Library','status-library'];
}

function statusIcon(l){
  if(l==='Currently Reading')return'●';if(l==='Completed')return'✓';
  if(l==='Upcoming')return'◎';if(l==='Community Pick')return'♡';return'📖';
}

function renderCard(b,num){
  const[label,cls]=statusLabel(b.status);
  return`<div class="book-card" data-num="${String(num).padStart(2,'0')}" data-country="${b.country}" data-status="${b.status}" data-continent="${b.continent||''}" onclick="openModal('${b.id}')">
    <div class="card-flag">${flagImg(b.code,'card-flag-img')}</div>
    <div class="card-country">${b.country}</div>
    <div class="card-title">${b.title}</div>
    <div class="card-author">${b.author}${b.year?', '+b.year:''}</div>
    ${b.desc?'<div class="card-desc">'+b.desc+'</div>':''}
    ${b.why?'<div class="card-why"><div class="card-why-label">Why this book</div><div class="card-why-text">'+b.why+'</div></div>':''}
    <div class="card-status ${cls}"><span>${statusIcon(label)}</span> ${label}</div>
  </div>`;
}

function openModal(id){
  const b=FEATURED_BOOKS.find(x=>x.id===id);
  if(!b)return;
  document.getElementById('modal-flag').innerHTML=flagImg(b.code,'modal-flag-img');
  document.getElementById('modal-country').textContent=b.country;
  document.getElementById('modal-title').textContent=b.title;
  document.getElementById('modal-author').textContent=b.author+(b.year?' · '+b.year:'');
  document.getElementById('modal-desc').textContent=b.desc||'';
  document.getElementById('modal-why').textContent=b.why||'';
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(){
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow='';
}
function closeModalOutside(e){
  if(e.target===document.getElementById('modal-overlay'))closeModal();
}
if (typeof document !== 'undefined') {
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
}

// Library book popup (lightweight modal for library page books)
function openLibraryModal(title, author, country, code) {
  document.getElementById('modal-flag').innerHTML = flagImg(code,'modal-flag-img');
  document.getElementById('modal-country').textContent = country;
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-author').textContent = author;
  document.getElementById('modal-desc').textContent = '"' + title + '" by ' + author + ' — a story from ' + country + ' that invites you to see the world through new eyes.';
  document.getElementById('modal-why').textContent = 'Selected as part of our journey through the literature of ' + country + '. Every book is a door to understanding a new culture.';
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

export {
  flagUrl,
  flagImg,
  FEATURED_BOOKS,
  MAP_COORDS,
  LIBRARY_BOOKS,
  slugify,
  getBookMetadata,
  ALL_DISCOVERABLE_BOOKS,
  codeToFlag,
  statusLabel,
  statusIcon,
  renderCard,
  openModal,
  closeModal,
  closeModalOutside,
  openLibraryModal
};
