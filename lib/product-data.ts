// Mock product data with detailed information
export type ProductColor = {
  name: string
  value: string
  image?: string
}

export type ProductSize = {
  name: string
  value: string
  inStock: boolean
}

export type Product = {
  id: string
  name: string
  price: string
  image: string
  images: string[]
  category: string
  colors: ProductColor[]
  sizes: ProductSize[]
  description: string
  details: string[]
  material: string
  care: string[]
  sku: string
  inStock: boolean
  isNew?: boolean
  isFeatured?: boolean
  relatedProducts?: string[]
}

export const products: Product[] = [
  {
    id: "1",
    name: "Graphic Tee",
    price: "₱899",
    image: "/placeholder.svg?height=600&width=480",
    images: [
      "/placeholder.svg?height=600&width=480",
      "/placeholder.svg?height=600&width=480&text=Graphic+Tee+Front",
      "/placeholder.svg?height=600&width=480&text=Graphic+Tee+Back",
      "/placeholder.svg?height=600&width=480&text=Graphic+Tee+Detail",
    ],
    category: "t-shirts",
    colors: [
      { name: "Black", value: "#000000", image: "/placeholder.svg?height=600&width=480" },
      { name: "White", value: "#FFFFFF", image: "/placeholder.svg?height=600&width=480&text=White+Variant" },
      { name: "Gray", value: "#808080", image: "/placeholder.svg?height=600&width=480&text=Gray+Variant" },
    ],
    sizes: [
      { name: "Small", value: "S", inStock: true },
      { name: "Medium", value: "M", inStock: true },
      { name: "Large", value: "L", inStock: true },
      { name: "X-Large", value: "XL", inStock: false },
    ],
    description:
      "Our signature graphic tee featuring a unique cosmic design. Made from premium cotton for ultimate comfort and durability. This versatile piece can be dressed up or down for any occasion.",
    details: ["100% premium cotton", "Regular fit", "Ribbed crew neck", "Screen-printed graphic", "Pre-shrunk fabric"],
    material: "100% Organic Cotton",
    care: [
      "Machine wash cold with similar colors",
      "Do not bleach",
      "Tumble dry low",
      "Warm iron if needed",
      "Do not dry clean",
    ],
    sku: "ST-GT-001",
    inStock: true,
    isNew: true,
    isFeatured: true,
    relatedProducts: ["2", "8", "12"],
  },
  {
    id: "2",
    name: "Logo Hoodie",
    price: "₱1,499",
    image: "/placeholder.svg?height=600&width=480",
    images: [
      "/placeholder.svg?height=600&width=480",
      "/placeholder.svg?height=600&width=480&text=Hoodie+Front",
      "/placeholder.svg?height=600&width=480&text=Hoodie+Back",
      "/placeholder.svg?height=600&width=480&text=Hoodie+Detail",
    ],
    category: "hoodies",
    colors: [
      { name: "Gray", value: "#808080", image: "/placeholder.svg?height=600&width=480" },
      { name: "Black", value: "#000000", image: "/placeholder.svg?height=600&width=480&text=Black+Variant" },
      { name: "Navy", value: "#000080", image: "/placeholder.svg?height=600&width=480&text=Navy+Variant" },
    ],
    sizes: [
      { name: "Small", value: "S", inStock: true },
      { name: "Medium", value: "M", inStock: true },
      { name: "Large", value: "L", inStock: true },
      { name: "X-Large", value: "XL", inStock: true },
    ],
    description:
      "Stay warm and stylish with our signature logo hoodie. Features a comfortable kangaroo pocket and adjustable drawstring hood. Made from a soft cotton-polyester blend for the perfect balance of comfort and durability.",
    details: [
      "80% cotton, 20% polyester",
      "Regular fit",
      "Adjustable drawstring hood",
      "Kangaroo pocket",
      "Ribbed cuffs and hem",
      "Embroidered logo",
    ],
    material: "80% Cotton, 20% Polyester",
    care: [
      "Machine wash cold with similar colors",
      "Do not bleach",
      "Tumble dry low",
      "Do not iron on print/graphic",
      "Do not dry clean",
    ],
    sku: "ST-LH-002",
    inStock: true,
    isFeatured: true,
    relatedProducts: ["1", "3", "5"],
  },
  {
    id: "3",
    name: "Cargo Pants",
    price: "₱1,299",
    image: "/placeholder.svg?height=600&width=480",
    images: [
      "/placeholder.svg?height=600&width=480",
      "/placeholder.svg?height=600&width=480&text=Cargo+Front",
      "/placeholder.svg?height=600&width=480&text=Cargo+Back",
      "/placeholder.svg?height=600&width=480&text=Cargo+Detail",
    ],
    category: "pants",
    colors: [
      { name: "Green", value: "#006400", image: "/placeholder.svg?height=600&width=480" },
      { name: "Black", value: "#000000", image: "/placeholder.svg?height=600&width=480&text=Black+Variant" },
      { name: "Khaki", value: "#C3B091", image: "/placeholder.svg?height=600&width=480&text=Khaki+Variant" },
    ],
    sizes: [
      { name: "28", value: "28", inStock: true },
      { name: "30", value: "30", inStock: true },
      { name: "32", value: "32", inStock: true },
      { name: "34", value: "34", inStock: true },
      { name: "36", value: "36", inStock: false },
    ],
    description:
      "Our versatile cargo pants combine style and functionality with multiple pockets and a comfortable fit. Perfect for everyday wear or outdoor activities. Features a relaxed fit with tapered legs for a modern silhouette.",
    details: [
      "98% cotton, 2% elastane",
      "Relaxed fit with tapered leg",
      "Multiple cargo pockets",
      "Button and zip fly closure",
      "Adjustable drawstring at ankle",
      "Belt loops",
    ],
    material: "98% Cotton, 2% Elastane",
    care: [
      "Machine wash cold",
      "Gentle cycle with similar colors",
      "Do not bleach",
      "Tumble dry low",
      "Warm iron if needed",
    ],
    sku: "ST-CP-003",
    inStock: true,
    isFeatured: true,
    relatedProducts: ["6", "9", "2"],
  },
  {
    id: "4",
    name: "Cap",
    price: "₱799",
    image: "/placeholder.svg?height=600&width=480",
    images: [
      "/placeholder.svg?height=600&width=480",
      "/placeholder.svg?height=600&width=480&text=Cap+Side",
      "/placeholder.svg?height=600&width=480&text=Cap+Back",
      "/placeholder.svg?height=600&width=480&text=Cap+Detail",
    ],
    category: "headwear",
    colors: [
      { name: "Black", value: "#000000", image: "/placeholder.svg?height=600&width=480" },
      { name: "White", value: "#FFFFFF", image: "/placeholder.svg?height=600&width=480&text=White+Variant" },
      { name: "Red", value: "#FF0000", image: "/placeholder.svg?height=600&width=480&text=Red+Variant" },
    ],
    sizes: [{ name: "One Size", value: "OS", inStock: true }],
    description:
      "Complete your look with our classic cap featuring our signature embroidered logo. Adjustable strap ensures a perfect fit for all sizes. Made from durable cotton twill for long-lasting wear.",
    details: [
      "100% cotton twill",
      "6-panel construction",
      "Embroidered logo",
      "Adjustable strap with metal buckle",
      "Curved brim",
      "Ventilation eyelets",
    ],
    material: "100% Cotton Twill",
    care: ["Spot clean only", "Do not wash", "Do not bleach", "Do not tumble dry", "Do not iron"],
    sku: "ST-CP-004",
    inStock: true,
    isFeatured: true,
    relatedProducts: ["7", "12", "10"],
  },
  {
    id: "5",
    name: "Varsity Jacket",
    price: "₱2,499",
    image: "/placeholder.svg?height=600&width=480",
    images: [
      "/placeholder.svg?height=600&width=480",
      "/placeholder.svg?height=600&width=480&text=Jacket+Front",
      "/placeholder.svg?height=600&width=480&text=Jacket+Back",
      "/placeholder.svg?height=600&width=480&text=Jacket+Detail",
    ],
    category: "jackets",
    colors: [
      { name: "Blue", value: "#0000FF", image: "/placeholder.svg?height=600&width=480" },
      { name: "Black", value: "#000000", image: "/placeholder.svg?height=600&width=480&text=Black+Variant" },
      { name: "Red", value: "#FF0000", image: "/placeholder.svg?height=600&width=480&text=Red+Variant" },
    ],
    sizes: [
      { name: "Small", value: "S", inStock: true },
      { name: "Medium", value: "M", inStock: true },
      { name: "Large", value: "L", inStock: true },
      { name: "X-Large", value: "XL", inStock: false },
    ],
    description:
      "Our premium varsity jacket combines classic style with modern details. Features a wool-blend body with contrast sleeves and custom embroidery. Ribbed collar, cuffs, and hem provide a comfortable fit.",
    details: [
      "Wool blend body with synthetic leather sleeves",
      "Regular fit",
      "Snap button closure",
      "Ribbed collar, cuffs, and hem",
      "Interior pocket",
      "Custom embroidery",
      "Fully lined",
    ],
    material: "Body: 80% Wool, 20% Nylon; Sleeves: 100% Polyurethane",
    care: ["Dry clean only", "Do not wash", "Do not bleach", "Do not tumble dry", "Do not iron"],
    sku: "ST-VJ-005",
    inStock: true,
    isNew: true,
    relatedProducts: ["2", "3", "6"],
  },
  {
    id: "6",
    name: "Denim Jeans",
    price: "₱1,399",
    image: "/placeholder.svg?height=600&width=480",
    images: [
      "/placeholder.svg?height=600&width=480",
      "/placeholder.svg?height=600&width=480&text=Jeans+Front",
      "/placeholder.svg?height=600&width=480&text=Jeans+Back",
      "/placeholder.svg?height=600&width=480&text=Jeans+Detail",
    ],
    category: "pants",
    colors: [
      { name: "Blue", value: "#0000FF", image: "/placeholder.svg?height=600&width=480" },
      { name: "Black", value: "#000000", image: "/placeholder.svg?height=600&width=480&text=Black+Variant" },
      { name: "Light Wash", value: "#ADD8E6", image: "/placeholder.svg?height=600&width=480&text=Light+Wash+Variant" },
    ],
    sizes: [
      { name: "28", value: "28", inStock: true },
      { name: "30", value: "30", inStock: true },
      { name: "32", value: "32", inStock: true },
      { name: "34", value: "34", inStock: true },
      { name: "36", value: "36", inStock: true },
    ],
    description:
      "Classic denim jeans with a modern fit. Made from premium denim with a touch of stretch for comfort. Features a slim fit through the leg with a slight taper for a contemporary silhouette.",
    details: [
      "98% cotton, 2% elastane",
      "Slim fit with slight taper",
      "Button and zip fly closure",
      "Five-pocket styling",
      "Belt loops",
      "Signature stitching on back pockets",
    ],
    material: "98% Cotton, 2% Elastane",
    care: [
      "Machine wash cold inside out",
      "Wash with similar colors",
      "Do not bleach",
      "Tumble dry low",
      "Warm iron if needed",
    ],
    sku: "ST-DJ-006",
    inStock: true,
    relatedProducts: ["3", "9", "5"],
  },
  {
    id: "7",
    name: "Bucket Hat",
    price: "₱899",
    image: "/placeholder.svg?height=600&width=480",
    images: [
      "/placeholder.svg?height=600&width=480",
      "/placeholder.svg?height=600&width=480&text=Hat+Side",
      "/placeholder.svg?height=600&width=480&text=Hat+Top",
      "/placeholder.svg?height=600&width=480&text=Hat+Detail",
    ],
    category: "headwear",
    colors: [
      { name: "White", value: "#FFFFFF", image: "/placeholder.svg?height=600&width=480" },
      { name: "Black", value: "#000000", image: "/placeholder.svg?height=600&width=480&text=Black+Variant" },
      { name: "Beige", value: "#F5F5DC", image: "/placeholder.svg?height=600&width=480&text=Beige+Variant" },
    ],
    sizes: [
      { name: "Small", value: "S", inStock: true },
      { name: "Medium", value: "M", inStock: true },
      { name: "Large", value: "L", inStock: true },
    ],
    description:
      "Trendy bucket hat with our embroidered logo. Perfect for adding a stylish touch to any casual outfit. Made from durable cotton twill with ventilation eyelets for breathability.",
    details: ["100% cotton twill", "Embroidered logo", "Ventilation eyelets", "Foldable design", "Contrast stitching"],
    material: "100% Cotton Twill",
    care: ["Hand wash cold", "Do not bleach", "Lay flat to dry", "Do not iron", "Do not dry clean"],
    sku: "ST-BH-007",
    inStock: true,
    isNew: true,
    relatedProducts: ["4", "12", "1"],
  },
  {
    id: "8",
    name: "Oversized Tee",
    price: "₱999",
    image: "/placeholder.svg?height=600&width=480",
    images: [
      "/placeholder.svg?height=600&width=480",
      "/placeholder.svg?height=600&width=480&text=Oversized+Front",
      "/placeholder.svg?height=600&width=480&text=Oversized+Back",
      "/placeholder.svg?height=600&width=480&text=Oversized+Detail",
    ],
    category: "t-shirts",
    colors: [
      { name: "White", value: "#FFFFFF", image: "/placeholder.svg?height=600&width=480" },
      { name: "Black", value: "#000000", image: "/placeholder.svg?height=600&width=480&text=Black+Variant" },
      { name: "Sand", value: "#C2B280", image: "/placeholder.svg?height=600&width=480&text=Sand+Variant" },
    ],
    sizes: [
      { name: "Small", value: "S", inStock: true },
      { name: "Medium", value: "M", inStock: true },
      { name: "Large", value: "L", inStock: true },
      { name: "X-Large", value: "XL", inStock: true },
    ],
    description:
      "Our bestselling oversized tee with a relaxed fit and dropped shoulders for that perfect slouchy look. Made from heavyweight cotton for a premium feel and exceptional durability.",
    details: [
      "100% heavyweight cotton",
      "Oversized fit with dropped shoulders",
      "Ribbed crew neck",
      "Minimal branding",
      "Side slits at hem",
    ],
    material: "100% Heavyweight Cotton (220 gsm)",
    care: [
      "Machine wash cold",
      "Wash inside out with similar colors",
      "Do not bleach",
      "Tumble dry low",
      "Warm iron on reverse if needed",
    ],
    sku: "ST-OT-008",
    inStock: true,
    isFeatured: true,
    relatedProducts: ["1", "2", "11"],
  },
  {
    id: "9",
    name: "Track Pants",
    price: "₱1,199",
    image: "/placeholder.svg?height=600&width=480",
    images: [
      "/placeholder.svg?height=600&width=480",
      "/placeholder.svg?height=600&width=480&text=Track+Front",
      "/placeholder.svg?height=600&width=480&text=Track+Back",
      "/placeholder.svg?height=600&width=480&text=Track+Detail",
    ],
    category: "pants",
    colors: [
      { name: "Black", value: "#000000", image: "/placeholder.svg?height=600&width=480" },
      { name: "Navy", value: "#000080", image: "/placeholder.svg?height=600&width=480&text=Navy+Variant" },
      { name: "Gray", value: "#808080", image: "/placeholder.svg?height=600&width=480&text=Gray+Variant" },
    ],
    sizes: [
      { name: "Small", value: "S", inStock: true },
      { name: "Medium", value: "M", inStock: true },
      { name: "Large", value: "L", inStock: true },
      { name: "X-Large", value: "XL", inStock: true },
    ],
    description:
      "Comfortable track pants with a modern tapered fit. Features our signature side stripe and zippered pockets. Perfect for workouts or casual wear with a technical polyester blend for moisture-wicking performance.",
    details: [
      "88% polyester, 12% elastane",
      "Tapered fit",
      "Elastic waistband with drawstring",
      "Side stripe detail",
      "Zippered side pockets",
      "Ankle zippers",
    ],
    material: "88% Polyester, 12% Elastane",
    care: ["Machine wash cold", "Do not bleach", "Do not tumble dry", "Do not iron", "Do not dry clean"],
    sku: "ST-TP-009",
    inStock: true,
    relatedProducts: ["3", "6", "2"],
  },
  {
    id: "10",
    name: "Crossbody Bag",
    price: "₱1,099",
    image: "/placeholder.svg?height=600&width=480",
    images: [
      "/placeholder.svg?height=600&width=480",
      "/placeholder.svg?height=600&width=480&text=Bag+Front",
      "/placeholder.svg?height=600&width=480&text=Bag+Back",
      "/placeholder.svg?height=600&width=480&text=Bag+Detail",
    ],
    category: "accessories",
    colors: [
      { name: "Black", value: "#000000", image: "/placeholder.svg?height=600&width=480" },
      { name: "Olive", value: "#808000", image: "/placeholder.svg?height=600&width=480&text=Olive+Variant" },
    ],
    sizes: [{ name: "One Size", value: "OS", inStock: true }],
    description:
      "Practical and stylish crossbody bag with multiple compartments for all your essentials. Features adjustable strap and water-resistant material. Perfect for everyday use or travel.",
    details: [
      "Water-resistant polyester",
      "Adjustable shoulder strap",
      "Main compartment with zip closure",
      "Front pocket with magnetic snap",
      "Interior zip pocket",
      "Embroidered logo patch",
      "Dimensions: 20cm x 15cm x 5cm",
    ],
    material: "100% Polyester with PU coating",
    care: ["Spot clean only", "Do not wash", "Do not bleach", "Do not tumble dry", "Do not iron"],
    sku: "ST-CB-010",
    inStock: true,
    relatedProducts: ["11", "4", "7"],
  },
  {
    id: "11",
    name: "Socks (3 Pack)",
    price: "₱599",
    image: "/placeholder.svg?height=600&width=480",
    images: [
      "/placeholder.svg?height=600&width=480",
      "/placeholder.svg?height=600&width=480&text=Socks+Set",
      "/placeholder.svg?height=600&width=480&text=Socks+Detail",
    ],
    category: "accessories",
    colors: [
      { name: "Gray", value: "#808080", image: "/placeholder.svg?height=600&width=480" },
      { name: "Black", value: "#000000", image: "/placeholder.svg?height=600&width=480&text=Black+Variant" },
      { name: "Mixed", value: "#CCCCCC", image: "/placeholder.svg?height=600&width=480&text=Mixed+Variant" },
    ],
    sizes: [
      { name: "Medium (6-8)", value: "M", inStock: true },
      { name: "Large (9-12)", value: "L", inStock: true },
    ],
    description:
      "Set of three premium crew socks featuring our logo. Made with combed cotton for exceptional comfort and durability. Reinforced heel and toe for extended wear.",
    details: [
      "80% combed cotton, 18% polyester, 2% elastane",
      "Crew length",
      "Ribbed cuff",
      "Reinforced heel and toe",
      "Embroidered logo",
      "Cushioned footbed",
    ],
    material: "80% Combed Cotton, 18% Polyester, 2% Elastane",
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low", "Do not iron", "Do not dry clean"],
    sku: "ST-SK-011",
    inStock: true,
    relatedProducts: ["10", "4", "7"],
  },
  {
    id: "12",
    name: "Beanie",
    price: "₱699",
    image: "/placeholder.svg?height=600&width=480",
    images: [
      "/placeholder.svg?height=600&width=480",
      "/placeholder.svg?height=600&width=480&text=Beanie+Side",
      "/placeholder.svg?height=600&width=480&text=Beanie+Front",
      "/placeholder.svg?height=600&width=480&text=Beanie+Detail",
    ],
    category: "headwear",
    colors: [
      { name: "Green", value: "#008000", image: "/placeholder.svg?height=600&width=480" },
      { name: "Black", value: "#000000", image: "/placeholder.svg?height=600&width=480&text=Black+Variant" },
      { name: "Gray", value: "#808080", image: "/placeholder.svg?height=600&width=480&text=Gray+Variant" },
    ],
    sizes: [{ name: "One Size", value: "OS", inStock: true }],
    description:
      "Cozy ribbed beanie with our embroidered logo. Made from a soft acrylic blend for warmth and comfort. Perfect for cold weather or adding a stylish touch to any outfit.",
    details: ["100% acrylic", "Ribbed knit construction", "Fold-up cuff", "Embroidered logo", "Stretchy fit"],
    material: "100% Acrylic",
    care: ["Hand wash cold", "Do not bleach", "Lay flat to dry", "Do not iron", "Do not dry clean"],
    sku: "ST-BH-012",
    inStock: true,
    relatedProducts: ["4", "7", "11"],
  },
  {
    id: "13",
    name: "Hotwheels Hoodie",
    price: "₱1,899",
    image: "/placeholder.svg?height=600&width=480&text=Hotwheels+Hoodie",
    images: [
      "/placeholder.svg?height=600&width=480&text=Hotwheels+Hoodie",
      "/placeholder.svg?height=600&width=480&text=Hotwheels+Hoodie+Front",
      "/placeholder.svg?height=600&width=480&text=Hotwheels+Hoodie+Back",
      "/placeholder.svg?height=600&width=480&text=Hotwheels+Hoodie+Detail",
    ],
    category: "hoodies",
    colors: [
      { name: "Red", value: "#FF0000", image: "/placeholder.svg?height=600&width=480&text=Hotwheels+Hoodie" },
      { name: "Black", value: "#000000", image: "/placeholder.svg?height=600&width=480&text=Hotwheels+Hoodie+Black" },
    ],
    sizes: [
      { name: "Small", value: "S", inStock: true },
      { name: "Medium", value: "M", inStock: true },
      { name: "Large", value: "L", inStock: true },
      { name: "X-Large", value: "XL", inStock: true },
    ],
    description:
      "Limited edition Starboy X Hotwheels collaboration hoodie featuring iconic racing graphics and premium embroidery. This collector's item combines streetwear style with classic automotive heritage.",
    details: [
      "80% cotton, 20% polyester",
      "Regular fit",
      "Adjustable drawstring hood",
      "Kangaroo pocket",
      "Ribbed cuffs and hem",
      "Co-branded embroidery",
      "Special edition packaging",
    ],
    material: "80% Cotton, 20% Polyester",
    care: [
      "Machine wash cold with similar colors",
      "Do not bleach",
      "Tumble dry low",
      "Do not iron on print/graphic",
      "Do not dry clean",
    ],
    sku: "SB-HW-013",
    inStock: true,
    isNew: true,
    isFeatured: true,
    relatedProducts: ["14", "15", "2"],
  },
  {
    id: "14",
    name: "Hotwheels Tee",
    price: "₱1,199",
    image: "/placeholder.svg?height=600&width=480&text=Hotwheels+Tee",
    images: [
      "/placeholder.svg?height=600&width=480&text=Hotwheels+Tee",
      "/placeholder.svg?height=600&width=480&text=Hotwheels+Tee+Front",
      "/placeholder.svg?height=600&width=480&text=Hotwheels+Tee+Back",
      "/placeholder.svg?height=600&width=480&text=Hotwheels+Tee+Detail",
    ],
    category: "t-shirts",
    colors: [
      { name: "White", value: "#FFFFFF", image: "/placeholder.svg?height=600&width=480&text=Hotwheels+Tee" },
      { name: "Blue", value: "#0000FF", image: "/placeholder.svg?height=600&width=480&text=Hotwheels+Tee+Blue" },
    ],
    sizes: [
      { name: "Small", value: "S", inStock: true },
      { name: "Medium", value: "M", inStock: true },
      { name: "Large", value: "L", inStock: true },
      { name: "X-Large", value: "XL", inStock: true },
    ],
    description:
      "Limited edition Starboy X Hotwheels collaboration tee featuring vintage racing graphics and premium screen printing. This collector's item celebrates the iconic toy brand with streetwear sensibility.",
    details: [
      "100% premium cotton",
      "Regular fit",
      "Ribbed crew neck",
      "High-quality screen print",
      "Co-branded neck label",
      "Special edition packaging",
    ],
    material: "100% Organic Cotton",
    care: [
      "Machine wash cold with similar colors",
      "Do not bleach",
      "Tumble dry low",
      "Warm iron if needed",
      "Do not dry clean",
    ],
    sku: "SB-HW-014",
    inStock: true,
    isNew: true,
    isFeatured: true,
    relatedProducts: ["13", "15", "1"],
  },
  {
    id: "15",
    name: "Hotwheels Cap",
    price: "₱999",
    image: "/placeholder.svg?height=600&width=480&text=Hotwheels+Cap",
    images: [
      "/placeholder.svg?height=600&width=480&text=Hotwheels+Cap",
      "/placeholder.svg?height=600&width=480&text=Hotwheels+Cap+Side",
      "/placeholder.svg?height=600&width=480&text=Hotwheels+Cap+Back",
      "/placeholder.svg?height=600&width=480&text=Hotwheels+Cap+Detail",
    ],
    category: "headwear",
    colors: [
      { name: "Red", value: "#FF0000", image: "/placeholder.svg?height=600&width=480&text=Hotwheels+Cap" },
      { name: "Black", value: "#000000", image: "/placeholder.svg?height=600&width=480&text=Hotwheels+Cap+Black" },
    ],
    sizes: [{ name: "One Size", value: "OS", inStock: true }],
    description:
      "Limited edition Starboy X Hotwheels collaboration cap featuring racing-inspired embroidery and premium construction. This collector's item adds a touch of automotive heritage to your streetwear look.",
    details: [
      "100% cotton twill",
      "6-panel construction",
      "Co-branded embroidery",
      "Adjustable strap with metal buckle",
      "Curved brim",
      "Special edition packaging",
    ],
    material: "100% Cotton Twill",
    care: ["Spot clean only", "Do not wash", "Do not bleach", "Do not tumble dry", "Do not iron"],
    sku: "SB-HW-015",
    inStock: true,
    isNew: true,
    isFeatured: true,
    relatedProducts: ["13", "14", "4"],
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getRelatedProducts(ids: string[]): Product[] {
  return products.filter((product) => ids.includes(product.id))
}

