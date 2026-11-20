export const initialCategories = [
  {
    name: 'Steel Products',
    slug: 'steel-products',
    description: 'Steel rods, pipes, sheets, structural sections and more.',
    image: '/images/steel-framework.jpg',
    itemCount: 52,
    status: 'Active',
  },
  {
    name: 'Welding & Fabrication',
    slug: 'welding-fabrication',
    description: 'Custom fabrication, gates, grills, frames, metal structures and repair services.',
    image: '/images/welding-sparks.jpg',
    itemCount: 38,
    status: 'Active',
  },
  {
    name: 'Agricultural Equipment',
    slug: 'agricultural-equipment',
    description: 'Farming tools, implements, machinery and accessories.',
    image: '/images/agri-tractor.jpg',
    itemCount: 34,
    status: 'Active',
  },
];

export const initialServices = [
  {
    id: 'custom-fabrication',
    title: 'Custom Fabrication',
    subtitle: 'Steel frames, structures, components',
    category: 'Welding & Fabrication',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Tailor-made industrial and architectural metal fabrication manufactured to precise client drawings and load requirements.',
    features: ['Precision laser & plasma cutting', 'Heavy-duty steel frameworks', 'Custom brackets, plates & chassis', 'Rigid tolerance adherence']
  },
  {
    id: 'gate-grill-works',
    title: 'Gate & Grill Works',
    subtitle: 'Residential & commercial',
    category: 'Welding & Fabrication',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    description: 'High-durability decorative and security gates, window grills, protective railings, and automated driveway barriers.',
    features: ['Laser cut decorative panels', 'Galvanized anti-rust coatings', 'Heavy-duty sliding & swinging gates', 'Custom safety grilles']
  },
  {
    id: 'metal-cutting',
    title: 'Metal Cutting',
    subtitle: 'CNC & plasma cutting',
    category: 'Welding & Fabrication',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    description: 'Computerized high-speed CNC plasma and oxy-fuel cutting for steel plates, sheets, and thick gauge materials.',
    features: ['Up to 50mm plate thickness', 'Extreme edge accuracy', 'Minimal kerf & heat distortion', 'Fast turnaround for bulk lots']
  },
  {
    id: 'industrial-structures',
    title: 'Industrial Structures',
    subtitle: 'Sheds, warehouses, frameworks',
    category: 'Welding & Fabrication',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
    description: 'Pre-engineered steel buildings (PEB), factory sheds, industrial warehouse trusses, purlins, and heavy column structures.',
    features: ['High tensile structural steel', 'Seismic & wind load certified', 'Turnkey fabrication & erection', 'Long-span column-free design']
  },
  {
    id: 'welding-services',
    title: 'Welding Services',
    subtitle: 'MIG, TIG, ARC welding',
    category: 'Welding & Fabrication',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
    description: 'Certified multi-process welding services for carbon steel, stainless steel, and alloy metals meeting ASME & ISO specs.',
    features: ['MIG (GMAW) high-deposition welding', 'TIG (GTAW) sanitary & pipe welds', 'Shielded Metal Arc (SMAW)', 'NDT & X-ray weld inspection']
  },
  {
    id: 'repair-maintenance',
    title: 'Repair & Maintenance',
    subtitle: 'Industrial & machinery',
    category: 'Welding & Fabrication',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    description: 'On-site and workshop overhauls, crack repair, hard-facing, reinforcement, and structural integrity restoration.',
    features: ['24/7 breakdown callouts', 'Agricultural implement rebuilding', 'Heavy plant equipment repairs', 'Hard-facing for high wear parts']
  },
  {
    id: 'design-build',
    title: 'Design & Build',
    subtitle: 'As per your requirement',
    category: 'Welding & Fabrication',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    description: 'Complete end-to-end engineering from concept 3D CAD modeling, structural FEA analysis, prototyping to final installation.',
    features: ['3D CAD / SolidWorks modeling', 'Material optimization & cost reduction', 'Structural load simulations', 'Complete prototype testing']
  }
];

export const initialProducts = [
  // STEEL PRODUCTS
  {
    name: 'Steel Pipes',
    slug: 'steel-pipes',
    category: 'Steel Products',
    shortDescription: 'High-quality steel pipes for industrial, construction and agricultural applications. Available in various sizes and grades.',
    description: 'ZHI Dimension premium-grade steel pipes engineered for maximum tensile endurance, corrosion resistance, and fluid transport. Suitable for high-pressure industrial lines, construction columns, irrigation systems, and fabrication works.',
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      Material: 'Mild Steel / Stainless Steel',
      'Size Range': '1/2" - 12"',
      Length: '6m / 12m',
      Standards: 'IS / ASTM / Custom',
      WallThickness: '1.6mm - 12.0mm',
      Finish: 'Black, Oiled, Galvanized',
      TensileStrength: '350 - 550 MPa'
    },
    stockStatus: 'In Stock',
    stockQuantity: 420,
    isFeatured: true,
    priceEstimate: '₹ 62 / kg'
  },
  {
    name: 'Steel Sheets & Plates',
    slug: 'steel-sheets',
    category: 'Steel Products',
    shortDescription: 'Hot rolled and cold rolled high-tensile steel plates and sheet coils.',
    description: 'High tensile mild steel plates and CR coils formulated for structural fabrication, stamping, boiler manufacturing, and heavy container shells.',
    images: [
      'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      Material: 'IS 2062 Grade E250 / E350',
      Thickness: '1.2mm - 50mm',
      Width: '1250mm / 1500mm / 2000mm',
      Length: '2500mm to 12000mm',
      Coating: 'Pickled & Oiled / Mill Scale'
    },
    stockStatus: 'In Stock',
    stockQuantity: 180,
    isFeatured: true,
    priceEstimate: '₹ 58 / kg'
  },
  {
    name: 'TMT Reinforcement Bars',
    slug: 'tmt-bars',
    category: 'Steel Products',
    shortDescription: 'Fe 500D & 550D thermo-mechanically treated rebars for earthquake-resistant concrete.',
    description: 'Superior elongation, thermal resistance, and exceptional bendability rebar rods manufactured strictly conforming to IS 1786 specifications.',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      Grade: 'Fe 500D / Fe 550D',
      Diameter: '8mm - 32mm',
      Standard: 'IS 1786',
      Package: 'Bundled standard 12m lengths'
    },
    stockStatus: 'In Stock',
    stockQuantity: 650,
    isFeatured: false,
    priceEstimate: '₹ 54 / kg'
  },
  {
    name: 'Structural Beams & Channels',
    slug: 'structural-beams',
    category: 'Steel Products',
    shortDescription: 'Heavy I-Beams, H-Beams, MS Channels (ISMC), and Equal Angles.',
    description: 'Engineered structural sections built to support heavy static and dynamic loads across industrial sheds, bridges, and infrastructure works.',
    images: [
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      Section: 'ISMB 100 - ISMB 600 / ISMC 75 - ISMC 400',
      Material: 'Structural Mild Steel E250',
      Length: '6m / 11m / 12m',
      Compliance: 'IS 808 / IS 2062'
    },
    stockStatus: 'In Stock',
    stockQuantity: 130,
    isFeatured: false,
    priceEstimate: '₹ 64 / kg'
  },

  // WELDING & FABRICATION
  {
    name: 'Gate Fabrication & Grills',
    slug: 'gate-fabrication',
    category: 'Welding & Fabrication',
    shortDescription: 'Custom fabrication, gates, grills, frames, metal structures and repair services.',
    description: 'Custom architectural metal gates, ornamental compound boundaries, security grills, and industrial warehouse sliding doors crafted with precision CNC welding.',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      Material: 'Wrought Iron / MS Tubing / SS 304',
      Finish: 'Electrostatic Powder Coating / Epoxy Primer',
      Operation: 'Manual / Automatic Motorized Compatible',
      Warranty: '5-Year Structural Integrity'
    },
    stockStatus: 'In Stock',
    stockQuantity: 28,
    isFeatured: true,
    priceEstimate: '₹ 280 / sq.ft'
  },
  {
    name: 'Industrial Metal Frameworks',
    slug: 'industrial-metal-frameworks',
    category: 'Welding & Fabrication',
    shortDescription: 'Precision heavy-gauge steel framework skeletons, machine bases, and gantry towers.',
    description: 'Rigid welded structural skeletons designed for machinery mounts, crane gantries, and industrial mezzanines with rigorous ultrasonic weld verification.',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      WeldingMethod: 'MIG / Submerged Arc',
      LoadCapacity: 'Up to 50 Metric Tonnes',
      SurfaceTreatment: 'Hot Dip Galvanized / Industrial Polyurethane',
      Standard: 'ISO 3834-2 Certified'
    },
    stockStatus: 'In Stock',
    stockQuantity: 15,
    isFeatured: true,
    priceEstimate: 'Custom Quotation'
  },

  // AGRICULTURAL EQUIPMENT
  {
    name: 'Rotavator',
    slug: 'rotavator',
    category: 'Agricultural Equipment',
    shortDescription: 'Powerful soil preparation rotary tiller for modern high-yield farming.',
    description: 'Heavy duty rotary tiller implement engineered for secondary tillage. Pulverizes dense clods, incorporates crop stubble, and prepares an ultra-fine seedbed in single pass.',
    images: [
      'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      TractorPower: '35 HP - 75 HP compatible',
      WorkingWidth: '5 feet / 6 feet / 7 feet / 8 feet',
      BladeType: 'L-Type / C-Type Boron Steel Blades',
      Gearbox: 'Multi-speed heavy duty casting',
      TillageDepth: 'Up to 7 inches'
    },
    stockStatus: 'In Stock',
    stockQuantity: 45,
    isFeatured: true,
    priceEstimate: '₹ 95,000 / unit'
  },
  {
    name: 'Plough',
    slug: 'plough',
    category: 'Agricultural Equipment',
    shortDescription: 'Efficient field ploughing hydraulic reversible mouldboard implement.',
    description: 'High-clearance hydraulic reversible plough designed for deep primary tillage, inversion of hard soils, and burying green manure efficiently with reduced fuel burn.',
    images: [
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      Bottoms: '2-Bottom / 3-Bottom Reversible',
      WorkingDepth: '10 to 14 inches',
      SharePoint: 'Hardened Wear-Resistant Alloy',
      HydraulicMechanism: 'Dual-acting hydraulic cylinder',
      TractorRequirement: '45+ HP'
    },
    stockStatus: 'In Stock',
    stockQuantity: 32,
    isFeatured: true,
    priceEstimate: '₹ 68,000 / unit'
  },
  {
    name: 'Seed Drill',
    slug: 'seed-drill',
    category: 'Agricultural Equipment',
    shortDescription: 'Accurate seed placement and simultaneous fertilizer dispenser implement.',
    description: 'Automatic multi-row zero-till seed cum fertilizer drill with precision fluted rollers for uniform seed spacing and fertilizer depth, boosting germination percentages.',
    images: [
      'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      Rows: '9 Row / 11 Row / 13 Row',
      HopperCapacity: '120 kg Seed / 150 kg Fertilizer',
      MeteringMechanism: 'Aluminum Fluted Rollers',
      Frame: 'Heavy rectangular tubular box section',
      RowSpacing: 'Adjustable 7" - 9"'
    },
    stockStatus: 'Low Stock',
    stockQuantity: 4,
    isFeatured: true,
    priceEstimate: '₹ 52,000 / unit'
  },
  {
    name: 'Agricultural Sprayer',
    slug: 'sprayer',
    category: 'Agricultural Equipment',
    shortDescription: 'Tractor-mounted boom and orchard sprayer for healthy crops.',
    description: 'High pressure dual-diaphragm agricultural crop sprayer equipped with 400L-600L UV stabilized chemical tanks, stainless steel spray booms, and anti-drip nozzle bodies.',
    images: [
      'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      TankCapacity: '500 Liters / 600 Liters HDPE',
      BoomWidth: '24 feet - 36 feet folding boom',
      PumpCapacity: '55 LPM @ 40 Bar pressure',
      NozzleType: 'Ceramic hollow cone / Flat fan with anti-drip',
      PTOConnection: '540 RPM standard tractor linkage'
    },
    stockStatus: 'In Stock',
    stockQuantity: 18,
    isFeatured: true,
    priceEstimate: '₹ 82,000 / unit'
  }
];

export const initialEnquiries = [
  {
    customerName: 'Ravi Kumar',
    phone: '+91 98765 43210',
    email: 'ravi.kumar@infrastructure.in',
    productRequired: 'Steel Pipes',
    quantitySize: '250 meters, 4" MS Pipe (IS Standard)',
    message: 'Urgent requirement for warehouse sprinkler and structural columns in Chennai.',
    status: 'Pending',
    notes: 'Called customer; waiting on site engineer drawings.',
    createdAt: new Date('2025-04-20T10:30:00Z'),
  },
  {
    customerName: 'Priya S',
    phone: '+91 97890 12345',
    email: 'priya.s@agrifarms.com',
    productRequired: 'Rotavator',
    quantitySize: '2 units (6ft Heavy Duty)',
    message: 'Need 6ft rotary tiller compatible with 50 HP John Deere tractor for sugarcane field.',
    status: 'Quoted',
    notes: 'Quotation QT-2025-002 sent via WhatsApp and Email.',
    createdAt: new Date('2025-04-19T14:15:00Z'),
  },
  {
    customerName: 'Suresh',
    phone: '+91 94432 99881',
    email: 'sureshmetal@builds.org',
    productRequired: 'Metal Fabrication',
    quantitySize: 'Factory Shed Truss 40x80 ft',
    message: 'Seeking custom PEB fabrication quote for an industrial workshop shed.',
    status: 'In Progress',
    notes: 'CAD draft under review by fabrication department.',
    createdAt: new Date('2025-04-18T11:00:00Z'),
  },
  {
    customerName: 'Lakshmi',
    phone: '+91 99621 54321',
    email: 'lakshmifarms@gmail.com',
    productRequired: 'Plough',
    quantitySize: '1 unit (3-Bottom Hydraulic Reversible)',
    message: 'Looking for prompt delivery before monsoon tilling season.',
    status: 'Contacted',
    notes: 'Informed stock availability and arranged on-site field demo.',
    createdAt: new Date('2025-04-17T09:45:00Z'),
  },
  {
    customerName: 'Karthik',
    phone: '+91 98400 67890',
    email: 'karthik.enterprises@yahoo.com',
    productRequired: 'Steel Sheets',
    quantitySize: '15 Tonnes (3mm Hot Rolled Sheet)',
    message: 'Need quote including delivery to industrial estate.',
    status: 'Quoted',
    notes: 'Quote submitted at ₹58/kg + GST.',
    createdAt: new Date('2025-04-16T16:20:00Z'),
  },
  {
    customerName: 'Anand Mohan',
    phone: '+91 98221 44556',
    email: 'anand@mohanengg.co.in',
    productRequired: 'Gate & Grill Works',
    quantitySize: 'Residential Villa Automated Gates',
    message: 'CNC laser cut decorative gate design requirement with matching boundary grills.',
    status: 'Pending',
    notes: 'New enquiry from website.',
    createdAt: new Date('2025-04-15T12:00:00Z'),
  }
];

export const initialQuotations = [
  {
    quoteNumber: 'QT-2025-001',
    customerName: 'Karthik',
    phone: '+91 98400 67890',
    email: 'karthik.enterprises@yahoo.com',
    items: [
      {
        description: 'IS 2062 E250 Hot Rolled Steel Plates 3mm x 1250mm x 2500mm',
        quantity: 15000,
        unitRate: 58,
        total: 870000
      },
      {
        description: 'Freight & Handling to Industrial Estate',
        quantity: 1,
        unitRate: 18000,
        total: 18000
      }
    ],
    subtotal: 888000,
    tax: 159840,
    grandTotal: 1047840,
    status: 'Sent',
    validUntil: new Date('2025-05-01T00:00:00Z'),
    notes: 'Payment terms: 30% advance, balance against dispatch.',
    createdAt: new Date('2025-04-16T17:00:00Z')
  },
  {
    quoteNumber: 'QT-2025-002',
    customerName: 'Priya S',
    phone: '+91 97890 12345',
    email: 'priya.s@agrifarms.com',
    items: [
      {
        description: 'Heavy Duty 6ft Rotavator (Multi-Speed Gearbox, Boron Blades)',
        quantity: 2,
        unitRate: 95000,
        total: 190000
      },
      {
        description: 'PTO Shaft with Shear Bolt Protection',
        quantity: 2,
        unitRate: 4500,
        total: 9000
      }
    ],
    subtotal: 199000,
    tax: 23880,
    grandTotal: 222880,
    status: 'Sent',
    validUntil: new Date('2025-05-04T00:00:00Z'),
    notes: 'Free 1-year service warranty and complimentary spares kit included.',
    createdAt: new Date('2025-04-19T15:30:00Z')
  }
];

