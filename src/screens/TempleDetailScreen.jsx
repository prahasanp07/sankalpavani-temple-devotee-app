import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const templeDetailsMap = {
  'dodda-ganesha-basavanagudi': {
    deity: 'LORD GANESHA',
    style: 'VIJAYANAGARA / DRAVIDIAN',
    century: '16TH CENTURY',
    description: 'Home to the iconic 18-foot monolithic Lord Ganesha idol carved out of a single granite rock. Founded by Kempe Gowda I, the founder of Bengaluru, this sacred shrine is world-famous for its grand Benne Alankara (Butter Decoration) where 100 kg of fresh butter coats the deity without melting.'
  },
  'bull-temple-basavanagudi': {
    deity: 'NANDI (SACRED BULL)',
    style: 'DRAVIDIAN',
    century: '16TH CENTURY (1537 AD)',
    description: 'Situated inside Bugle Rock Park in Basavanagudi, this temple houses a massive 15-foot high by 20-foot long monolithic granite statue of Nandi, Lord Shiva’s sacred bull. It is the focal point of the historic annual Kadalekai Parishe (Groundnut Fair) held every winter.'
  },
  'kadu-malleshwara': {
    deity: 'LORD SHIVA (MALLIKARJUNA)',
    style: 'DRAVIDIAN / MARATHA',
    century: '17TH CENTURY (1669 AD)',
    description: 'Nestled amidst lush greenery in Malleswaram (which gets its name from this temple), this historic shrine was built by Venkoji, step-brother of Chhatrapati Shivaji Maharaj. The complex features the miraculous Dakshina Pinakini Nandishwara Teertha natural spring flowing continuously.'
  },
  'gavi-gangadhareshwara': {
    deity: 'LORD SHIVA',
    style: 'ROCK-CUT CAVE',
    century: '9TH CENTURY / KEMPE GOWDA II',
    description: 'An architectural marvel carved out of a natural granite cave in Gavipuram. Famous for two massive monolithic stone discs (Suryapana and Chandrapana) and a unique astronomical solar alignment during Makara Sankranti when sunlight passes between Nandi’s horns to directly illuminate the inner Shiva Linga.'
  },
  'banashankari-amma': {
    deity: 'GODDESS BANASHANKARI',
    style: 'DRAVIDIAN',
    century: '20TH CENTURY (1915 AD)',
    description: 'Located on Kanakapura Road, this revered shrine is dedicated to Goddess Banashankari, a form of Parvati. Unique in worshipping the deity during Rahukalam, thousands of devotees gather every Tuesday and Friday to light lamps made of inverted lemon peels filled with oil for divine blessings.'
  },
  'kote-venkataramana': {
    deity: 'LORD VENKATARAMANA',
    style: 'VIJAYANAGARA DRAVIDIAN',
    century: '17TH CENTURY (1689 AD)',
    description: 'Located adjacent to Tipu Sultan’s Summer Palace near KR Market, this ancient temple was built by King Chikka Devaraja Wodeyar of Mysuru. It showcases magnificent Vijayanagara pillars, intricate stone carvings, and weathered stone cannons.'
  },
  'ranganathaswamy-balepete': {
    deity: 'LORD RANGANATHA',
    style: 'VIJAYANAGARA DRAVIDIAN',
    century: '16TH CENTURY',
    description: 'Situated in the historic heart of old pete (Balepete), this temple houses a beautiful idol of Lord Ranganatha in reclining posture on Adishesha. Built during the era of Kempe Gowda, it features classic Vijayanagara stone pillars and a tranquil sanctum.'
  },
  'someshwara-ulsoor': {
    deity: 'LORD SHIVA & KAMAKSHI',
    style: 'CHOLA & VIJAYANAGARA',
    century: '12TH CENTURY CHOLA',
    description: 'One of the oldest temples in Bengaluru, with origins tracing back to the Chola Dynasty (12th century) and expanded by Kempe Gowda. It features a majestic Rajagopuram, intricate wall reliefs depicting the Girija Kalyana, and carved Yali pillars.'
  },
  'ragigudda-anjaneya': {
    deity: 'LORD HANUMAN',
    style: 'MODERN DRAVIDIAN',
    century: '20TH CENTURY (1969 AD)',
    description: 'Perched atop a scenic hillock in Jayanagar formed according to legend from a heap of finger millet (Ragi), this serene temple complex houses Lord Hanuman along with Shiva, Vishnu, and Brahma shrines. Famous for its grand annual Hanuman Jayanti chariot festival.'
  },
  'karanji-anjaneya-vvpuram': {
    deity: 'LORD HANUMAN',
    style: 'HERITAGE DRAVIDIAN',
    century: '16TH CENTURY',
    description: 'Located near Gandhi Bazaar on Bull Temple Road, this historic temple enshrines an imposing 18-foot tall standing Hanuman idol carved in relief. It sits near the ancient Karanji lake bed and is surrounded by Basavanagudi’s iconic heritage food streets.'
  },
  'vasavi-kanyaka-malleswaram': {
    deity: 'GODDESS VASAVI PARAMESHWARI',
    style: 'MODERN MARBLE & DRAVIDIAN',
    century: '20TH CENTURY',
    description: 'Situated in 8th Cross Malleswaram, this grand shrine is dedicated to Goddess Vasavi Kanyaka Parameshwari. Famous for its exquisite mirror hall (Dharshini Mandapam), elaborate flower decorations during Navaratri, and peaceful prayer courtyard.'
  },
  'dharmaraya-nagarathpete': {
    deity: 'DHARMARAYA & DRAUPADI AMMA',
    style: 'GANGA / CHOLA DRAVIDIAN',
    century: '11TH CENTURY (800+ YEARS)',
    description: 'The starting point and heart of the world-renowned Bengaluru Karaga Shaktyotsava festival. This historic temple is dedicated to the Pandava king Dharmaraya and Draupadi Amma, representing the unique cultural heritage of the Vahnikula Kshatriya community.'
  },
  'venugopala-malleswaram': {
    deity: 'LORD VENUGOPALA SWAMY',
    style: 'TRADITIONAL DRAVIDIAN',
    century: '19TH CENTURY',
    description: 'Located in 11th Cross Malleswaram, this quiet temple enshrines Lord Krishna playing the flute accompanied by Rukmini and Satyabhama. Encircled by sacred neem and champaka trees, it offers a peaceful spiritual retreat.'
  }
};

export default function TempleDetailScreen() {
  const { popScreen, pushScreen, selectService, selectedTemple } = useContext(AppContext);
  const details = templeDetailsMap[selectedTemple.id] || templeDetailsMap['dodda-ganesha-basavanagudi'];

  const [activeModal, setActiveModal] = React.useState(null); // 'darshan', 'services', 'events', 'amenities'
  const [expandedSection, setExpandedSection] = React.useState('normal');
  const [selectedSevaType, setSelectedSevaType] = React.useState('');

  const getTemplePhone = (id) => {
    const phones = {
      'dodda-ganesha-basavanagudi': '+91 80 2667 4526',
      'bull-temple-basavanagudi': '+91 80 2661 3148',
      'kadu-malleshwara': '+91 80 2334 0108',
      'gavi-gangadhareshwara': '+91 80 2660 1782',
      'banashankari-amma': '+91 80 2671 2262',
      'kote-venkataramana': '+91 80 2235 3422',
      'ranganathaswamy-balepete': '+91 80 2226 7886',
      'someshwara-ulsoor': '+91 80 2551 1133',
      'ragigudda-anjaneya': '+91 80 2658 0567',
      'karanji-anjaneya-vvpuram': '+91 80 2667 1133',
      'vasavi-kanyaka-malleswaram': '+91 80 2331 4322',
      'dharmaraya-nagarathpete': '+91 80 2222 5533',
      'venugopala-malleswaram': '+91 80 2334 1144'
    };
    return phones[id] || '+91 80 2661 2345';
  };

  const sevasByCategory = {
    'Daily': [
      { 
        name: 'Special Darshan', 
        desc: 'Quick access to the inner sanctum.', 
        price: 300,
        persons: 1,
        extraPersonCost: 0,
        capacity: 50,
        timings: '06:00 AM - 12:30 PM',
        type: 'Daily',
        instructions: 'Dress code: Traditional attire only. Dhoti/Kurta for men, Saree/Salwar for women.\nReporting time: 30 minutes prior to Selected slot at Special entry gate.'
      },
      { 
        name: 'Nitya Archana', 
        desc: 'Personalized chanting of deity names.', 
        price: 100,
        persons: 1,
        extraPersonCost: 0,
        capacity: 100,
        timings: '07:00 AM - 08:30 PM',
        type: 'Daily',
        instructions: 'Devotees are requested to bring coconut and fresh flowers if possible.\nDress code: Decent traditional/formal attire.'
      },
      { 
        name: 'Maha Mangalarathi', 
        desc: 'Witness the grand morning camphor offering.', 
        price: 50,
        persons: 1,
        extraPersonCost: 0,
        capacity: 200,
        timings: '06:00 AM - 06:30 AM',
        type: 'Daily',
        instructions: 'Be present at the temple main hall by 05:45 AM.\nDress code: Traditional attire only.'
      }
    ],
    'Weekly': [
      { 
        name: 'Friday Abhishekam', 
        desc: 'Holy bathing ritual of the main deity.', 
        price: 500,
        persons: 2,
        extraPersonCost: 100,
        capacity: 15,
        timings: '08:00 AM - 10:30 AM',
        type: 'Weekly',
        instructions: 'Holy prasadam and vastram will be distributed after the bathing ritual.\nDress code: Saree/Salwar for women, Dhoti/Veshti with shalya for men.'
      },
      { 
        name: 'Rahukala Durga Puja', 
        desc: 'Special weekly puja for divine blessings.', 
        price: 250,
        persons: 1,
        extraPersonCost: 50,
        capacity: 30,
        timings: '03:00 PM - 04:30 PM',
        type: 'Weekly',
        instructions: 'Performed during Rahukalam on Tuesdays and Fridays.\nDress code: Traditional attire.'
      },
      { 
        name: 'Sahasranama Archana', 
        desc: 'Chanting of 1000 sacred names.', 
        price: 200,
        persons: 1,
        extraPersonCost: 0,
        capacity: 50,
        timings: '09:00 AM - 10:30 AM',
        type: 'Weekly',
        instructions: 'Devotee names and gotram will be chanted during the seva.\nDress code: Traditional attire.'
      }
    ],
    'Monthly': [
      { 
        name: 'Sankashta Chaturthi', 
        desc: 'Monthly Ganesha puja for obstacle removal.', 
        price: 300,
        persons: 1,
        extraPersonCost: 50,
        capacity: 50,
        timings: '05:30 PM - 08:00 PM',
        type: 'Monthly',
        instructions: 'Performed on Chaturthi evening. Modak prasadam will be provided to pilgrims.\nDress code: Traditional attire.'
      },
      { 
        name: 'Pradosha Shiva Puja', 
        desc: 'Special evening abhishekam and prayers.', 
        price: 400,
        persons: 2,
        extraPersonCost: 100,
        capacity: 25,
        timings: '04:30 PM - 07:00 PM',
        type: 'Monthly',
        instructions: 'Performed during evening twilight. Milk/honey offerings are allowed by devotees.\nDress code: Traditional attire.'
      },
      { 
        name: 'Satyanarayana Vrata', 
        desc: 'Monthly ritual for prosperity and peace.', 
        price: 750,
        persons: 2,
        extraPersonCost: 150,
        capacity: 20,
        timings: '09:30 AM - 12:30 PM',
        type: 'Monthly',
        instructions: 'Couple booking recommended. Puja materials will be provided by the temple.\nDress code: Traditional attire.'
      }
    ],
    'Special': [
      { 
        name: 'Kalyanotsavam', 
        desc: 'Divine wedding ceremony of the Lord.', 
        price: 1000,
        persons: 2,
        extraPersonCost: 250,
        capacity: 10,
        timings: '10:00 AM - 12:30 PM',
        type: 'Special',
        instructions: 'Grand wedding ritual of the deities. Devotees receive special vastram (clothes) and laddu prasadam.\nDress code: Strict traditional attire only.'
      },
      { 
        name: 'Chandi Homam', 
        desc: 'Grand fire ritual for protective energy.', 
        price: 2500,
        persons: 4,
        extraPersonCost: 500,
        capacity: 5,
        timings: '08:00 AM - 01:30 PM',
        type: 'Special',
        instructions: 'Grand fire ritual. Highly powerful. Devotees sit around the homam pit.\nDress code: Strict traditional attire.'
      },
      { 
        name: 'Vahana Puja', 
        desc: 'Blessing of new vehicle at the shrine.', 
        price: 500,
        persons: 1,
        extraPersonCost: 0,
        capacity: 15,
        timings: '09:00 AM - 05:00 PM',
        type: 'Special',
        instructions: 'Vehicle blessing. Devotees must bring their vehicle to the temple gate.\nDress code: Standard clean clothes.'
      }
    ],
    'Dhanur Masa': [
      { 
        name: 'Dhanur Masa Archana', 
        desc: 'Early morning special worship in Margazhi.', 
        price: 150,
        persons: 1,
        extraPersonCost: 0,
        capacity: 50,
        timings: '05:00 AM - 06:30 AM',
        type: 'Dhanur Masa',
        instructions: 'Early morning Margazhi worship. Pongal prasadam is distributed to all devotees.\nDress code: Traditional attire.'
      },
      { 
        name: 'Tiruppavai Seva', 
        desc: 'Recitation of sacred hymns.', 
        price: 200,
        persons: 1,
        extraPersonCost: 0,
        capacity: 40,
        timings: '05:30 AM - 07:00 AM',
        type: 'Dhanur Masa',
        instructions: 'Recitation of Andal’s Tiruppavai hymns.\nDress code: Traditional attire.'
      },
      { 
        name: 'Pongal Prasadam Seva', 
        desc: 'Offering of sweet pongal to the deity.', 
        price: 100,
        persons: 1,
        extraPersonCost: 0,
        capacity: 100,
        timings: '06:30 AM - 07:30 AM',
        type: 'Dhanur Masa',
        instructions: 'Prasadam distribution sponsorship.\nDress code: Traditional attire.'
      }
    ]
  };

  const renderDarshanTimings = () => {
    const timings = [
      {
        key: 'normal',
        title: 'Normal Days',
        sub: 'General Weekdays',
        morning: '06:00 AM - 12:30 PM',
        evening: '04:30 PM - 09:00 PM'
      },
      {
        key: 'weekends',
        title: 'Weekends',
        sub: 'Saturdays & Sundays',
        morning: '06:00 AM - 01:30 PM',
        evening: '04:00 PM - 09:30 PM'
      },
      {
        key: 'dhanur',
        title: 'Dhanur Masa Season',
        sub: 'Special Holy Month',
        morning: '05:00 AM - 12:30 PM',
        evening: '04:30 PM - 08:30 PM'
      },
      {
        key: 'special',
        title: 'Special Occasions',
        sub: 'Festivals & Utsavas',
        morning: '05:30 AM - 02:00 PM',
        evening: '04:00 PM - 10:00 PM'
      }
    ];

    return (
      <div className="flex flex-col gap-3 mt-2">
        {timings.map((item) => {
          const isExpanded = expandedSection === item.key;
          return (
            <div 
              key={item.key} 
              className="flex flex-col border border-white-muted/10 rounded-xl bg-navy-surface overflow-hidden shadow-sm"
            >
              {/* Accordion Header */}
              <button
                onClick={() => setExpandedSection(isExpanded ? null : item.key)}
                className={`w-full px-4 py-3.5 flex justify-between items-center text-left transition-colors focus:outline-none ${
                  isExpanded ? 'bg-navy-bg/20 border-b border-white-muted/5' : 'hover:bg-white-muted/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-primary"></div>
                  <div>
                    <h4 className="font-bold text-xs text-black uppercase tracking-wider">{item.title}</h4>
                    <p className="text-[9px] text-white-muted font-medium mt-0.5">{item.sub}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gold-primary text-lg transition-transform duration-200">
                  {isExpanded ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="p-4 flex flex-col gap-3.5 bg-navy-bg/10 animate-[fadeIn_0.2s_ease-out]">
                  {/* Morning Slots card */}
                  <div className="bg-navy-surface border border-white-muted/10 p-3.5 rounded-xl flex items-center gap-3.5 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-gold-primary/10 flex items-center justify-center text-gold-primary">
                      <span className="material-symbols-outlined text-base">wb_sunny</span>
                    </div>
                    <div>
                      <p className="font-semibold text-[9px] text-white-muted uppercase tracking-wider">Morning Slots</p>
                      <p className="font-bold text-xs text-black mt-0.5">{item.morning}</p>
                    </div>
                  </div>

                  {/* Evening Slots card */}
                  <div className="bg-navy-surface border border-white-muted/10 p-3.5 rounded-xl flex items-center gap-3.5 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-gold-primary/10 flex items-center justify-center text-gold-primary">
                      <span className="material-symbols-outlined text-base">bedtime</span>
                    </div>
                    <div>
                      <p className="font-semibold text-[9px] text-white-muted uppercase tracking-wider">Evening Slots</p>
                      <p className="font-bold text-xs text-black mt-0.5">{item.evening}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderServices = () => {
    let list = [];
    if (selectedSevaType === 'All') {
      list = Object.values(sevasByCategory).flat();
    } else {
      list = sevasByCategory[selectedSevaType] || [];
    }
    return (
      <div className="flex flex-col gap-3">
        {list.map((seva, idx) => (
          <div 
            key={idx}
            className="bg-navy-surface p-4 rounded-xl border border-white-muted/10 flex justify-between items-center"
          >
            <div className="flex-1 pr-3">
              <h3 className="font-headline-sm text-sm text-on-surface uppercase font-bold">{seva.name}</h3>
              <p className="font-body-md text-[11px] text-white-muted mt-0.5 line-clamp-2 leading-snug">{seva.desc}</p>
              <p className="font-headline-sm text-gold-primary font-bold mt-1 text-sm">₹{seva.price}</p>
            </div>
            <button
              onClick={() => {
                setActiveModal(null);
                selectService(seva);
              }}
              className="bg-gold-primary text-navy-bg font-headline-sm text-[11px] font-bold uppercase py-2 px-4 rounded-lg hover:bg-gold-secondary transition-colors"
            >
              Book
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            setActiveModal(null);
            pushScreen('services-list');
          }}
          className="w-full text-center text-gold-primary hover:text-gold-secondary font-headline-sm text-xs uppercase font-bold py-2 mt-1 transition-colors"
        >
          View All Services
        </button>
      </div>
    );
  };

  const renderEvents = () => {
    const events = [
      { name: 'Brahmotsavam', date: 'Oct 15 - Oct 23', desc: 'Grand annual festival featuring deity processions, chariot festivals, and special Vedic chants.' },
      { name: 'Navaratri Celebrations', date: 'Oct 03 - Oct 12', desc: 'Nine days of special Alankara decorations, classical performances, and music festivals.' },
      { name: 'Hanuman Jayanti', date: 'Dec 18', desc: 'Special morning abhishekam and distribution of holy ragi prasadam.' }
    ];

    return (
      <div className="flex flex-col gap-3">
        {events.map((event, idx) => (
          <div 
            key={idx}
            className="bg-navy-surface p-4 rounded-xl border border-white-muted/10 flex gap-3.5 items-start"
          >
            <span className="material-symbols-outlined text-gold-primary text-xl mt-0.5">event</span>
            <div className="flex-1">
              <div className="flex justify-between items-baseline gap-2">
                <h3 className="font-headline-sm text-sm text-on-surface uppercase font-bold">{event.name}</h3>
                <span className="text-[10px] font-semibold text-gold-primary uppercase whitespace-nowrap">{event.date}</span>
              </div>
              <p className="font-body-md text-[11px] text-white-muted mt-1 leading-relaxed">{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAmenities = () => {
    const amenities = [
      { name: 'Parking', icon: 'local_parking', desc: 'Spacious dedicated parking slots for both two-wheelers and four-wheelers.' },
      { name: 'Wheelchair Assistance', icon: 'accessible', desc: 'Ramp access at main entry and complementary wheelchairs for elderly or disabled pilgrims.' },
      { name: 'Drinking Water', icon: 'local_drinking_water', desc: 'RO-filtered clean drinking water points installed throughout the temple complex.' },
      { name: 'Cloak Room', icon: 'checkroom', desc: 'Safe deposit counter for safe storage of bags, footwear, and electronic items.' },
      { name: 'Restrooms', icon: 'wc', desc: 'Clean, sanitised toilets and washroom facilities available near the main exit.' }
    ];

    return (
      <div className="flex flex-col gap-3">
        {amenities.map((item, idx) => (
          <div 
            key={idx}
            className="bg-navy-surface p-3.5 rounded-xl border border-white-muted/10 flex gap-3.5 items-start"
          >
            <span className="material-symbols-outlined text-gold-primary text-xl mt-0.5">{item.icon}</span>
            <div>
              <h3 className="font-headline-sm text-xs font-bold text-on-surface uppercase tracking-wide">{item.name}</h3>
              <p className="font-body-md text-[11px] text-white-muted mt-0.5 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-navy-bg text-on-surface font-body-md antialiased pb-24 h-full overflow-y-auto relative">
      {/* Full Width Header Image */}
      <header className="relative w-full h-[40vh] min-h-[300px]">
        <img 
          alt={selectedTemple.name} 
          className="w-full h-full object-cover" 
          src={selectedTemple.img}
        />
        {/* Top Nav Icons (Overlay) */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/60 to-transparent">
          <button 
            onClick={popScreen}
            className="material-symbols-outlined text-white text-2xl drop-shadow-md hover:text-gold-primary transition-colors"
            aria-label="Back"
          >
            arrow_back
          </button>
        </div>
        
        {/* Vertical Text */}
        <div className="absolute top-20 right-4 z-10 max-w-[200px]">
          <span className="font-headline-sm vertical-text text-white/80 text-xl tracking-widest font-bold uppercase drop-shadow-md">
            {selectedTemple.name.split(' ').slice(0, 2).join(' ')}
          </span>
        </div>
        
        {/* Bottom Gradient & Specs */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-bg via-navy-bg/85 to-transparent pt-20 pb-4 px-4">
          <div className="flex justify-between items-center w-full max-w-lg mx-auto border-t border-b border-white-muted/10 py-3">
            <span className="material-symbols-outlined text-gold-primary text-[20px]">arrow_upward</span>
            <div className="text-center">
              <p className="font-label-caps text-[10px] text-white-muted uppercase tracking-wide">Architectural Style</p>
              <p className="font-headline-sm text-sm font-bold text-on-surface uppercase mt-0.5">{details.style}</p>
            </div>
            <div className="text-center">
              <p className="font-label-caps text-[10px] text-white-muted uppercase tracking-wide">Deity</p>
              <p className="font-headline-sm text-sm font-bold text-on-surface uppercase mt-0.5">{details.deity}</p>
            </div>
            <div className="text-center">
              <p className="font-label-caps text-[10px] text-white-muted uppercase tracking-wide">Century Built</p>
              <p className="font-headline-sm text-sm font-bold text-on-surface uppercase mt-0.5">{details.century}</p>
            </div>
            <span className="material-symbols-outlined text-gold-primary text-[20px]">arrow_downward</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-6">
        {/* Title Section */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="font-label-caps text-label-caps text-gold-primary uppercase tracking-widest mb-1 font-bold">TRENDING TEMPLES</p>
            <h1 className="font-headline-lg text-[22px] leading-tight font-bold text-on-surface uppercase max-w-xs">{selectedTemple.name}</h1>
          </div>
          <div className="text-right">
            <p className="font-headline-md text-lg font-bold text-gold-primary">RATING: {selectedTemple.rating}</p>
          </div>
        </div>
        
        {/* Description */}
        <div className="mb-6">
          <p className="font-body-md text-on-surface/90 leading-relaxed text-sm">
            {details.description}
          </p>
        </div>

        {/* Contact & Location Section */}
        <div className="mb-6 bg-navy-surface/50 p-4 rounded-xl border border-white-muted/5 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-gold-primary text-[20px]">call</span>
            <div>
              <p className="font-label-caps text-[10px] text-white-muted uppercase tracking-wide">Phone Number</p>
              <a 
                href={`tel:${getTemplePhone(selectedTemple.id)}`}
                className="font-body-md text-on-surface font-semibold hover:text-gold-primary transition-colors mt-0.5 block"
              >
                {getTemplePhone(selectedTemple.id)}
              </a>
            </div>
          </div>
          <div className="border-t border-white-muted/5 my-0.5"></div>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-gold-primary text-[20px] mt-0.5">location_on</span>
            <div className="flex-1">
              <p className="font-label-caps text-[10px] text-white-muted uppercase tracking-wide">Location</p>
              <p className="font-body-md text-on-surface font-semibold mt-0.5 leading-snug">{selectedTemple.location}</p>
            </div>
            <button className="flex items-center gap-1 text-gold-primary hover:text-gold-secondary font-headline-sm uppercase font-bold tracking-wide transition-colors text-[10px] mt-1 shrink-0">
              View Map
            </button>
          </div>
        </div>

        {/* Seva Type Selection */}
        <div className="flex flex-col gap-2.5 mb-6 bg-navy-surface/50 p-4 rounded-xl border border-white-muted/5">
          <div className="flex flex-col">
            <span className="font-headline-sm text-xs font-bold text-on-surface uppercase tracking-wider">Seva Type</span>
            <p className="text-[10px] text-white-muted/70 mt-0.5">Click on a category pill below to view and book specific sevas.</p>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {['All', 'Daily', 'Weekly', 'Monthly', 'Special', 'Dhanur Masa'].map((type) => {
              const isActive = selectedSevaType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setSelectedSevaType(type);
                    setActiveModal('services');
                  }}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all border shrink-0 focus:outline-none ${
                    isActive 
                      ? 'bg-gold-primary text-navy-bg border-gold-primary shadow-sm' 
                      : 'bg-navy-bg border-white-muted/15 text-white-muted hover:border-gold-primary/30'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Cards Grid for Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Card 1: Darshan Timings (Spans full width) */}
          <div 
            onClick={() => setActiveModal('darshan')}
            className="col-span-2 bg-navy-surface p-4 rounded-xl border border-white-muted/10 hover:border-gold-primary/30 transition-all cursor-pointer flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-gold-primary text-[22px]">schedule</span>
              <div>
                <h3 className="font-headline-sm text-xs font-bold text-on-surface uppercase tracking-wide">Darshan Timings</h3>
                <p className="font-body-md text-[10px] text-white-muted mt-0.5">Today: 6:00 AM - 9:00 PM (Accordion View)</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-white-muted/30 text-[18px]">arrow_forward</span>
          </div>

          {/* Card 2: Upcoming Events */}
          <div 
            onClick={() => setActiveModal('events')}
            className="bg-navy-surface p-4 rounded-xl border border-white-muted/10 hover:border-gold-primary/30 transition-all cursor-pointer flex flex-col justify-between min-h-[110px]"
          >
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-gold-primary text-[22px]">event</span>
              <span className="material-symbols-outlined text-white-muted/30 text-[18px]">arrow_forward</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-xs font-bold text-on-surface uppercase tracking-wide">Upcoming Events</h3>
              <p className="font-body-md text-[10px] text-white-muted mt-0.5">Brahmotsavam, Navaratri...</p>
            </div>
          </div>

          {/* Card 3: Amenities */}
          <div 
            onClick={() => setActiveModal('amenities')}
            className="bg-navy-surface p-4 rounded-xl border border-white-muted/10 hover:border-gold-primary/30 transition-all cursor-pointer flex flex-col justify-between min-h-[110px]"
          >
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-gold-primary text-[22px]">local_parking</span>
              <span className="material-symbols-outlined text-white-muted/30 text-[18px]">arrow_forward</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-xs font-bold text-on-surface uppercase tracking-wide">Amenities</h3>
              <p className="font-body-md text-[10px] text-white-muted mt-0.5">Parking, Accessibility...</p>
            </div>
          </div>
        </div>
        
        {/* Donate Now Banner */}
        <div className="mb-8 bg-gradient-to-br from-navy-surface to-navy-bg p-5 rounded-xl border border-gold-primary/20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gold-primary/5"></div>
          <div className="relative z-10">
            <h2 className="font-headline-md text-lg font-bold text-on-surface uppercase mb-1">Support the Temple</h2>
            <p className="font-body-md text-white-muted text-xs mb-4 max-w-sm mx-auto">Your generous contributions help in the maintenance and development of the temple facilities.</p>
            <button 
              onClick={() => pushScreen('donation')}
              className="bg-transparent border border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-navy-bg font-headline-sm text-xs font-bold uppercase py-2 px-6 rounded-lg transition-colors inline-block w-full"
            >
              DONATE NOW
            </button>
          </div>
        </div>
      </main>
      
      {/* Fixed CTA Footer */}
      <div className="fixed bottom-0 w-full max-w-md bg-navy-bg border-t border-white-muted/10 p-margin-main pb-safe flex gap-4 z-40">
        <button 
          onClick={() => pushScreen('services-list')}
          className="flex-1 bg-gold-primary text-navy-bg font-headline-sm text-lg font-bold uppercase py-3.5 rounded-xl hover:bg-gold-secondary transition-colors"
        >
          BOOK SEVA
        </button>
      </div>

      {/* Slide-Up Bottom Sheet Modal Backdrop */}
      {activeModal && (
        <div 
          onClick={() => setActiveModal(null)}
          className="fixed inset-0 bg-black/60 z-45 max-w-md mx-auto transition-opacity duration-300"
        />
      )}

      {/* Slide-Up Bottom Sheet Modal */}
      <div 
        className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-navy-bg rounded-t-3xl pt-3 px-6 pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-white-muted/10 transition-transform duration-300 ease-out transform ${activeModal ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {/* Drag Indicator */}
        <div className="w-12 h-1 bg-white-muted/20 rounded-full mx-auto mb-4"></div>

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-headline-md text-base font-bold text-gold-primary uppercase tracking-wide">
            {activeModal === 'darshan' && 'Darshan Timings'}
            {activeModal === 'services' && `Services & Sevas - ${selectedSevaType}`}
            {activeModal === 'events' && 'Upcoming Events'}
            {activeModal === 'amenities' && 'Temple Amenities'}
          </h2>
          <button 
            onClick={() => setActiveModal(null)}
            className="material-symbols-outlined text-white-muted hover:text-gold-primary transition-colors text-xl p-1"
            aria-label="Close modal"
          >
            close
          </button>
        </div>

        {/* Content Area */}
        <div className="max-h-[50vh] overflow-y-auto no-scrollbar pb-4">
          {activeModal === 'darshan' && renderDarshanTimings()}
          {activeModal === 'services' && renderServices()}
          {activeModal === 'events' && renderEvents()}
          {activeModal === 'amenities' && renderAmenities()}
        </div>
      </div>
    </div>
  );
}
