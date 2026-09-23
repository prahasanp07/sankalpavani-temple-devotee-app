import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const templeDetailsMap = {
  'sri-lakshmi-narasimha-marenahalli': {
    deity: 'LORD LAKSHMI NARASIMHA',
    style: 'CHOLA / HOYSALA HERITAGE',
    century: '10TH CENTURY',
    description: `1. Sthala Mahime & Mythological Significance
According to temple sthala purana, two revered sages named Suyajna and Lambakarna performed intense austerities (tapasya) here. Pleased with their devotion, Lord Narasimha manifested before them in a calm, benevolent form (Sowmya Murthy) with Goddess Lakshmi seated on his left lap, promising to reside eternally at this spot.

2. Historical & Architectural Heritage
The temple has over 1,000 to 1,200 years of documented history and is a protected monument under the Archaeological Survey of India (ASI):
• Chola Dynasty (10th Century CE): Historical inscriptions state that the foundational core (Garbhagriha, Antarala, and Mukhamandapa) was established and patronized during the reign of Raja Raja Chola I (985–1014 CE). In Chola inscriptions, the settlement is mentioned as Rajashraya Vinnagaram and Cholendra Chaturvedi Mangala.
• Hoysala & Vijayanagara Expansion: Over the centuries, Hoysala rulers (including King Vishnuvardhana) and Vijayanagara monarchs extended the complex by adding an expansive 108-pillared courtyard (Prakara/Suttalaya), the Patalaankana, and the entrance Sabhamantapa.
• Entrance Features: The temple approach features a towering 40-foot monolith Garuda Gamba / Deepasthambha, followed by shrines for Lord Veera Anjaneya and Lord Ganesha at the entrance.
• Amriteshwara Shrine: Right at the entrance sits the small, ancient Amriteshwara (Lord Shiva) temple, representing Shaiva-Vaishnava harmony.`
  },
  'sri-lakshmi-narayana-eshwarahalli': {
    deity: 'LORD LAKSHMI NARAYANA',
    style: 'CLASSIC TRIKUTA / HOYSALA',
    century: 'HOYSALA ERA (RESTORED 1999)',
    description: `The Sacred Treasures of Eshwarahalli: A Journey of Devotion and Heritage
Nestled in the lush, historic heart of the Chikkamagaluru district in Karnataka, the serene village of Eshwarahalli houses two magnificent spiritual landmarks. Geographically blessed, this hidden gem is ideally situated directly between Kalasapura and the famed heritage village of Belavadi, placing it just a short drive away from the world-renowned UNESCO Hoysala marvels at Belur and Halebeedu. Together, these sites beautifully blend rare ancient architectural lineage, community devotion, and raw natural wonder.

1. The Sri Lakshmi Narayana Temple: A Trikuta Architectural Marvel Restored
The Sri Lakshmi Narayana Temple stands as a glowing testament to the power of community-led restoration and profound spiritual heritage. Mirroring the grand Hoysala traditions of its neighbouring regions, this temple is an overlooked treasure of art and history. By the late 20th century, the ancient stone structure had sadly fallen into complete shackles and neglect.

2. A Historic Rebirth (The 1999 Turning Point)
For decades, this sacred structure sat in ruins. The turning point arrived in 1999 when a dedicated group of disciples and local bhakthas (devotees) united with a single mission: to rescue their heritage from the brink of loss. Through collective funding, volunteer labor, and relentless devotion, the community systematically resurrected the stone structure, restarted ancient daily rituals, and built a vibrant, newly rejuvenated home for their deities.

3. Rare Features & Divine Lineage Under One Roof
• Classic Trikuta Architecture: The temple features a grand three-shrinement structure (Trikuta layout), where three distinct inner sanctums converge beautifully into a central stone gathering hall—a signature design of Karnataka’s golden medieval era.
• The Moola Devaru (Sri Lakshmi Narayana): The heart of the temple is the stunning main deity, Lord Lakshmi Narayana, carving a serene presence with Goddess Lakshmi seated gracefully on His lap, framed by an exquisitely detailed golden Prabhavali (ornate arch).
• The Rare 4-Foot Alwar Monolith: The temple houses a spectacular, monolithic four-foot-tall statue of an Alwar saint holding a staff. Finding an Alwar idol of this magnificent scale in a small village shrine is exceptionally rare, marking it as a site of immense pride for the Sri Vaishnava tradition.
• Complete Divine Lineage: In a beautiful layout of cosmic energy, the temple uniquely houses Lord Lakshmi Narayana, Lord Venugopala Krishna, Yoganarasimha, and Andaal Thaayar Sanidhi all directly under one single, unified roof. The grey stone exterior is beautifully adorned with traditional relief sculptures, including a depiction of Lord Vishnu reclining on Adisesha (Anantasayana).

Today, the Lakshmi Narayana Temple is a thriving, neatly maintained spiritual hub filled with active community festivals and peaceful village energy.`
  },
  'dodda-ganesha-basavanagudi': {
    deity: 'LORD LAKSHMI NARAYANA',
    style: 'CLASSIC TRIKUTA / HOYSALA',
    century: 'HOYSALA ERA (RESTORED 1999)',
    description: `The Sacred Treasures of Eshwarahalli: A Journey of Devotion and Heritage
Nestled in the lush, historic heart of the Chikkamagaluru district in Karnataka, the serene village of Eshwarahalli houses two magnificent spiritual landmarks. Geographically blessed, this hidden gem is ideally situated directly between Kalasapura and the famed heritage village of Belavadi, placing it just a short drive away from the world-renowned UNESCO Hoysala marvels at Belur and Halebeedu. Together, these sites beautifully blend rare ancient architectural lineage, community devotion, and raw natural wonder.

1. The Sri Lakshmi Narayana Temple: A Trikuta Architectural Marvel Restored
The Sri Lakshmi Narayana Temple stands as a glowing testament to the power of community-led restoration and profound spiritual heritage. Mirroring the grand Hoysala traditions of its neighbouring regions, this temple is an overlooked treasure of art and history. By the late 20th century, the ancient stone structure had sadly fallen into complete shackles and neglect.

2. A Historic Rebirth (The 1999 Turning Point)
For decades, this sacred structure sat in ruins. The turning point arrived in 1999 when a dedicated group of disciples and local bhakthas (devotees) united with a single mission: to rescue their heritage from the brink of loss. Through collective funding, volunteer labor, and relentless devotion, the community systematically resurrected the stone structure, restarted ancient daily rituals, and built a vibrant, newly rejuvenated home for their deities.

3. Rare Features & Divine Lineage Under One Roof
• Classic Trikuta Architecture: The temple features a grand three-shrinement structure (Trikuta layout), where three distinct inner sanctums converge beautifully into a central stone gathering hall—a signature design of Karnataka’s golden medieval era.
• The Moola Devaru (Sri Lakshmi Narayana): The heart of the temple is the stunning main deity, Lord Lakshmi Narayana, carving a serene presence with Goddess Lakshmi seated gracefully on His lap, framed by an exquisitely detailed golden Prabhavali (ornate arch).
• The Rare 4-Foot Alwar Monolith: The temple houses a spectacular, monolithic four-foot-tall statue of an Alwar saint holding a staff. Finding an Alwar idol of this magnificent scale in a small village shrine is exceptionally rare, marking it as a site of immense pride for the Sri Vaishnava tradition.
• Complete Divine Lineage: In a beautiful layout of cosmic energy, the temple uniquely houses Lord Lakshmi Narayana, Lord Venugopala Krishna, Yoganarasimha, and Andaal Thaayar Sanidhi all directly under one single, unified roof. The grey stone exterior is beautifully adorned with traditional relief sculptures, including a depiction of Lord Vishnu reclining on Adisesha (Anantasayana).

Today, the Lakshmi Narayana Temple is a thriving, neatly maintained spiritual hub filled with active community festivals and peaceful village energy.`
  },
  'shree-gudadha-ranganatha-eshwarahalli': {
    deity: 'LORD RANGANATHA & SHIVA LINGA (HARI-HARA)',
    style: 'NATURAL CAVE SHRINE',
    century: 'ANCIENT NATURAL CAVE',
    description: `Shree Gudadha Ranganatha Swamy Temple: The Mystical Cave of Hari-Hara
Perched atop a scenic, rugged granite hillock just a short distance away lies the captivating Shree Gudadha Ranganatha Swamy Temple (meaning "Ranganatha of the Hill"). This site offers a stunning combination of raw geography and unique theological unity.

1. A Natural Cave Formation
Unlike standard concrete structures, this is a natural cave temple. The summit features massive, towering granite boulders painted with traditional white and maroon religious stripes, crowned by a stone pillar that watches over the valley. Pilgrims enter through a modest, whitewashed stone doorway built directly against the rock face. Stepping down into the low-ceilinged, naturally cool stone cavern transports visitors back in time, offering an intimate, mystical space perfect for quiet prayer and meditation. From the summit, visitors are treated to breathtaking, panoramic views of Chikkamagaluru's lush green fields and rolling hills.

2. The Ultimate Convergence: Ranganatha Inscribed on a Linga
The crowning glory and ultimate beauty of this shrine lies in its unique iconography. Inside the naturally sheltered cave, lit by the warm glow of traditional lamps (deepas), rests the sacred mound. The form of Lord Ranganatha (the reclining manifestation of Lord Vishnu) is intricately inscribed directly over a Shiva Linga. Adorned with fresh flowers, fruits, and holy offerings, this profound, hybrid presentation beautifully merges the traditions of Hari (Vishnu) and Hara (Shiva) into a single, unified sacred object.

3. Ongoing Path to Accessibility
True to the unbroken community spirit of Eshwarahalli, devotees are actively spearheading ongoing efforts to construct formal steps up the steep, rocky hillock. This project will ensure that the breathtaking panoramic views and the sacred cave itself are safely accessible to elders, children, and pilgrims traveling along the historic Belur-Halebeedu-Chikkamagaluru tourist circuit.`
  },
  'bull-temple-basavanagudi': {
    deity: 'LORD RANGANATHA & SHIVA LINGA (HARI-HARA)',
    style: 'NATURAL CAVE SHRINE',
    century: 'ANCIENT NATURAL CAVE',
    description: `Shree Gudadha Ranganatha Swamy Temple: The Mystical Cave of Hari-Hara
Perched atop a scenic, rugged granite hillock just a short distance away lies the captivating Shree Gudadha Ranganatha Swamy Temple (meaning "Ranganatha of the Hill"). This site offers a stunning combination of raw geography and unique theological unity.

1. A Natural Cave Formation
Unlike standard concrete structures, this is a natural cave temple. The summit features massive, towering granite boulders painted with traditional white and maroon religious stripes, crowned by a stone pillar that watches over the valley. Pilgrims enter through a modest, whitewashed stone doorway built directly against the rock face. Stepping down into the low-ceilinged, naturally cool stone cavern transports visitors back in time, offering an intimate, mystical space perfect for quiet prayer and meditation. From the summit, visitors are treated to breathtaking, panoramic views of Chikkamagaluru's lush green fields and rolling hills.

2. The Ultimate Convergence: Ranganatha Inscribed on a Linga
The crowning glory and ultimate beauty of this shrine lies in its unique iconography. Inside the naturally sheltered cave, lit by the warm glow of traditional lamps (deepas), rests the sacred mound. The form of Lord Ranganatha (the reclining manifestation of Lord Vishnu) is intricately inscribed directly over a Shiva Linga. Adorned with fresh flowers, fruits, and holy offerings, this profound, hybrid presentation beautifully merges the traditions of Hari (Vishnu) and Hara (Shiva) into a single, unified sacred object.

3. Ongoing Path to Accessibility
True to the unbroken community spirit of Eshwarahalli, devotees are actively spearheading ongoing efforts to construct formal steps up the steep, rocky hillock. This project will ensure that the breathtaking panoramic views and the sacred cave itself are safely accessible to elders, children, and pilgrims traveling along the historic Belur-Halebeedu-Chikkamagaluru tourist circuit.`
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
  const details = templeDetailsMap[selectedTemple.id] || templeDetailsMap['sri-lakshmi-narayana-eshwarahalli'] || templeDetailsMap['dodda-ganesha-basavanagudi'];

  const [activeModal, setActiveModal] = React.useState(null); // 'darshan', 'services', 'events', 'amenities'
  const [expandedSection, setExpandedSection] = React.useState('normal');
  const [selectedSevaType, setSelectedSevaType] = React.useState('');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = React.useState(false);

  const getTempleContact = (id) => {
    const contacts = {
      'sri-lakshmi-narayana-eshwarahalli': {
        phone: '+91 82 6223 4567',
        whatsapp: '+91 94482 12345'
      },
      'shree-gudadha-ranganatha-eshwarahalli': {
        phone: '+91 82 6223 4568',
        whatsapp: '+91 94482 12346'
      },
      'sri-lakshmi-narasimha-marenahalli': {
        phone: '+91 80 2661 2345',
        whatsapp: '+91 98450 12345'
      },
      'dodda-ganesha-basavanagudi': {
        phone: '+91 80 2667 4526',
        whatsapp: '+91 98451 23456'
      },
      'bull-temple-basavanagudi': {
        phone: '+91 82 6223 4568',
        whatsapp: '+91 94482 12346'
      },
      'kadu-malleshwara': {
        phone: '+91 80 2334 0108',
        whatsapp: '+91 98452 34567'
      },
      'gavi-gangadhareshwara': {
        phone: '+91 80 2660 1782',
        whatsapp: '+91 98453 45678'
      },
      'banashankari-amma': {
        phone: '+91 80 2671 2262',
        whatsapp: '+91 98454 56789'
      },
      'kote-venkataramana': {
        phone: '+91 80 2235 3422',
        whatsapp: '+91 98455 67890'
      },
      'ranganathaswamy-balepete': {
        phone: '+91 80 2226 7886',
        whatsapp: '+91 98456 78901'
      },
      'someshwara-ulsoor': {
        phone: '+91 80 2551 1133',
        whatsapp: '+91 98457 89012'
      },
      'ragigudda-anjaneya': {
        phone: '+91 80 2658 0567',
        whatsapp: '+91 98458 90123'
      },
      'karanji-anjaneya-vvpuram': {
        phone: '+91 80 2667 1133',
        whatsapp: '+91 98459 01234'
      },
      'vasavi-kanyaka-malleswaram': {
        phone: '+91 80 2331 4322',
        whatsapp: '+91 98450 98765'
      },
      'dharmaraya-nagarathpete': {
        phone: '+91 80 2222 5533',
        whatsapp: '+91 98451 87654'
      },
      'venugopala-malleswaram': {
        phone: '+91 80 2334 1144',
        whatsapp: '+91 98452 76543'
      }
    };
    return contacts[id] || { phone: '+91 80 2661 2345', whatsapp: '+91 98450 12345' };
  };

  const getTemplePhone = (id) => getTempleContact(id).phone;

  const sevasByCategory = {
    'Daily': [
      {
        id: 'SV-SV-1787581117591',
        name: 'Suprabhata Seva',
        desc: 'Morning awakening and daily worship of the Lord.',
        price: 150,
        persons: 5,
        extraPersonCost: 0,
        capacity: 20,
        timings: '08:00 AM - 08:30 PM',
        type: 'Daily',
        instructions: 'Morning awakening and daily worship of the Lord.',
        status: 'Active'
      },
      {
        id: 'SV-SV-1787581225681',
        name: 'Sahasranama Archane',
        desc: "Chanting of the Lord's holy names.",
        price: 150,
        persons: 5,
        extraPersonCost: 5,
        capacity: 'Unlimited',
        timings: '08:00 AM - 09:30 PM',
        type: 'Daily',
        instructions: "Chanting of the Lord's holy names.",
        status: 'Active'
      },
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
        id: 'SV-SV-1787581326760',
        name: 'Amrutha Kalasha Prarthana',
        desc: 'Devotees offer special prayers to Goddess Mahalakshmi. It is a strong local belief that invoking the Goddess, who has an Amrutha Kalasha (pot of nectar) below her lotus feet, fulfills the true desires of the devotee',
        price: 150,
        persons: 2,
        extraPersonCost: 100,
        capacity: 5,
        timings: '08:00 AM - 10:30 PM',
        type: 'Weekly',
        selectedDays: ['Saturday', 'Sunday'],
        instructions: 'Devotees offer special prayers to Goddess Mahalakshmi. It is a strong local belief that invoking the Goddess, who has an Amrutha Kalasha (pot of nectar) below her lotus feet, fulfills the true desires of the devotee',
        status: 'Active'
      },
      {
        name: 'Friday Abhishekam',
        desc: 'Holy bathing ritual of the main deity.',
        price: 500,
        persons: 2,
        extraPersonCost: 100,
        capacity: 15,
        timings: '08:00 AM - 10:30 AM',
        type: 'Weekly',
        selectedDays: ['Friday'],
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
        selectedDays: ['Tuesday', 'Friday'],
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
    ],
    'Annually': []
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
                className={`w-full px-4 py-3.5 flex justify-between items-center text-left transition-colors focus:outline-none ${isExpanded ? 'bg-navy-bg/20 border-b border-white-muted/5' : 'hover:bg-white-muted/5'
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
      <header className="relative w-full aspect-video md:aspect-[21/9] max-h-[380px] overflow-hidden">
        <img
          alt={selectedTemple.name}
          className="w-full h-full object-cover"
          src={selectedTemple.img}
        />
        {/* Top Nav Icons (Overlay) */}
        <div className="absolute top-0 left-0 w-full p-4 pt-[max(env(safe-area-inset-top),1.5rem)] flex justify-between items-center z-10 bg-gradient-to-b from-black/70 to-transparent">
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
        <div className="mb-6 bg-navy-surface/40 p-4 rounded-xl border border-white-muted/10">
          <div
            onClick={() => setIsDescriptionExpanded(prev => !prev)}
            className="cursor-pointer group"
          >
            <p className={`font-body-md text-on-surface/90 leading-relaxed text-sm whitespace-pre-line transition-all duration-300 ${!isDescriptionExpanded ? 'line-clamp-5' : ''
              }`}>
              {details.description}
            </p>
            <div className="mt-2.5 flex items-center justify-end">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDescriptionExpanded(prev => !prev);
                }}
                className="text-xs font-bold text-gold-primary hover:text-gold-secondary flex items-center gap-1 focus:outline-none transition-colors"
              >
                <span>{isDescriptionExpanded ? 'Show Less' : '... Read More'}</span>
                <span
                  className="material-symbols-outlined text-sm transition-transform duration-300"
                  style={{ transform: isDescriptionExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  expand_more
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Contact & Location Cards */}
        <div className="mb-6 flex flex-col gap-3.5">
          {/* Card 1: Phone & WhatsApp */}
          <div className="bg-navy-surface/60 p-4 rounded-2xl border border-white-muted/15 flex flex-col gap-3 shadow-sm">
            {/* Phone line */}
            <a
              href={`tel:${getTempleContact(selectedTemple.id).phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-3 text-on-surface hover:text-gold-primary transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary shrink-0 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[18px]">call</span>
              </div>
              <span className="font-body-md text-sm font-semibold text-on-surface group-hover:text-gold-primary transition-colors">
                {getTempleContact(selectedTemple.id).phone}
              </span>
            </a>

            <div className="border-t border-white-muted/10"></div>

            {/* WhatsApp line */}
            <a
              href={`https://wa.me/${getTempleContact(selectedTemple.id).whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-on-surface hover:text-emerald-400 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <svg className="w-4 h-4 text-[#25D366] fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.61c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.3z" />
                </svg>
              </div>
              <span className="font-body-md text-sm font-semibold text-on-surface group-hover:text-emerald-400 transition-colors">
                {getTempleContact(selectedTemple.id).whatsapp}
              </span>
            </a>
          </div>

          {/* Card 2: Location Address & View Maps CTA */}
          <div className="bg-navy-surface/60 p-4 rounded-2xl border border-white-muted/15 flex flex-col gap-3 shadow-sm">
            {/* Address line */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">location_on</span>
              </div>
              <div className="flex-1">
                <p className="font-body-md text-sm font-semibold text-on-surface leading-snug">
                  {selectedTemple.location}
                </p>
              </div>
            </div>

            <div className="border-t border-white-muted/10"></div>

            {/* View Maps CTA button */}
            <a
              href={selectedTemple.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(selectedTemple.name + ' ' + (selectedTemple.location || ''))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full py-2.5 px-3.5 rounded-xl bg-gold-primary/10 hover:bg-gold-primary/20 text-gold-primary transition-all font-headline-sm uppercase text-xs font-bold tracking-wider group"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">map</span>
                <span>View Maps</span>
              </div>
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
          </div>
        </div>

        {/* Seva Type Selection */}
        <div className="flex flex-col gap-2.5 mb-6 bg-navy-surface/50 p-4 rounded-xl border border-white-muted/5">
          <div className="flex flex-col">
            <span className="font-headline-sm text-xs font-bold text-on-surface uppercase tracking-wider">Seva Type</span>
            <p className="text-[10px] text-white-muted/70 mt-0.5">Click on a category pill below to view and book specific sevas.</p>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {['All', 'Daily', 'Weekly', 'Monthly', 'Annually', 'Special', 'Dhanur Masa'].map((type) => {
              const isActive = selectedSevaType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setSelectedSevaType(type);
                    setActiveModal('services');
                  }}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all border shrink-0 focus:outline-none ${isActive
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
      <div className="fixed bottom-0 inset-x-0 w-full bg-navy-bg border-t border-white-muted/10 p-margin-main pb-safe flex justify-center z-40">
        <div className="max-w-4xl w-full flex gap-4">
          <button
            onClick={() => pushScreen('services-list')}
            className="flex-1 bg-gold-primary text-navy-bg font-headline-sm text-lg font-bold uppercase py-3.5 rounded-xl hover:bg-gold-secondary transition-colors"
          >
            SEVA SANKALPA
          </button>
        </div>
      </div>

      {/* Slide-Up Bottom Sheet Modal Backdrop */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
          <div
            onClick={() => setActiveModal(null)}
            className="absolute inset-0"
          />

          {/* Slide-Up Bottom Sheet Modal */}
          <div
            className="relative w-full max-w-lg mx-auto bg-navy-bg rounded-t-3xl md:rounded-3xl md:mb-8 pt-3 px-6 pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border border-white-muted/10 z-10 max-h-[85vh] overflow-y-auto animate-[slideUp_0.25s_ease-out]"
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
      )}
    </div>
  );
}
