const brands = ["Versache", "Prada", "Zara", "Gucci", "Calvin Klein"];

const categories = ["T-shirt", "Jeans", "Hoodie", "Shorts", "Shirt", "Jacket"];
const styles = ["Casual", "Formal", "Gym", "Party"];

const colorPalette = {
  Black: "#000000",
  White: "#FFFFFF",
  Navy_Blue: "#000080",
  Dark_Olive_Green: "#556b2f",
  Spanish_Gray: "#989898",
  Burgundy: "#800020",
  Camel_Brown: "#c19a6b",
  Royal_Blue: "#4169e1",
};

const colorNames = Object.keys(colorPalette);

const sizeOptions = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];

const subStyles = {
  "T-shirt": ["Graphic", "Oversized", "V-Neck", "Slim Fit"],
  Jeans: ["Skinny", "Straight", "Slim Fit", "Relaxed", "Distressed"],
  Hoodie: ["Pullover", "Zip-up", "Oversized", "Fleece"],
  Shorts: ["Cargo", "Chino", "Athletic", "Denim"],
  Shirt: ["Oxford", "Flannel", "Cuban Collar", "Dress Shirt"],
  Jacket: ["Bomber", "Denim", "Windbreaker", "Parka"],
};

export const reviewBank = [
  {
    user: "Alex M.",
    comment: "Good color, but it shrunk after the first wash.",
    rating: 3,
  },
  {
    user: "Sarah K.",
    comment: "The material is surprisingly soft! Fits true to size.",
    rating: 4,
  },
  {
    user: "James L.",
    comment: "Perfect streetwear vibe. Shipping was fast too.",
    rating: 4,
  },
  {
    user: "Emily D.",
    comment: "A bit thinner than I expected, but great for summer.",
    rating: 3,
  },

  {
    user: "Jessica W.",
    comment: "The cut is a bit boxy, but I love the minimalist style.",
    rating: 4,
  },
  {
    user: "David H.",
    comment: "Standard quality. Good for the price point.",
    rating: 4,
  },
  {
    user: "Chloe P.",
    comment: "Absolutely love the packaging and the feel of the fabric.",
    rating: 5,
  },
  {
    user: "Suzie Q.",
    comment:
      "Finally, a brand that prioritizes longevity over fast fashion. I've washed this linen blend dress five times now, and the color is still vibrant and the seams are holding up perfectly. You can really feel the fabric weight and quality.",
    rating: 5,
  },
  {
    user: "Jotaro K.",
    comment:
      "Yare yare daze... I didn't think I'd find anything that could actually withstand the daily mess I deal with. This gear doesn't just look the part; it's durable enough to survive a direct hit and keep its shape. The fit is precise—no loose threads or cheap shortcuts that give out when the pressure is on.",
    rating: 5,
  },
  {
    user: "Michael B.",
    comment: "Best purchase this year. Highly recommend!",
    rating: 4,
  },
  {
    user: "Joseph J.",
    comment:
      "OH MY GOD!! This hoodie is so soft, I feel like I'm being hugged by a cloud! But don't let the comfort fool you—this thing is built for action! I wore it during my latest training session, and it handled every twist and turn without breaking a sweat.",
    rating: 5,
  },
  {
    user: "Robert E.O. Speedwagon",
    comment:
      "Even from my days in Ogre Street, I've never seen craftsmanship this pure! I can smell the integrity in the fibers. It's not just a garment; it's a testament to a brand that actually cares about its customers. I'll be recommending this to everyone at the Foundation!",
    rating: 5,
  },
  {
    user: "Dio Brando",
    comment:
      "A fit worthy of a king. While most modern rags are beneath me, the silhouette this jacket provides is almost... divine. It captures the light perfectly as I stand above the rest. I suppose I can allow it to grace my presence for a little longer.",
    rating: 5,
  },
  {
    user: "Josuke Higashikata",
    comment:
      "Man, this shirt is GREAT! The fabric is so high-quality that it doesn't even wrinkle when things get intense. Just make sure you don't get any dirt on it, or we're gonna have a serious problem. It matches my hair perfectly—total style points.",
    rating: 5,
  },
  {
    user: "Yoshikage Kira",
    comment:
      "I prefer a quiet life, and this suit helps me blend in while maintaining an impeccable standard. The stitching on the cuffs is remarkably subtle, and the material is soft enough that it doesn't irritate my hands. It's... peaceful.",
    rating: 5,
  },
  {
    user: "Giorno Giovanna",
    comment:
      "I, Giorno Giovanna, have a dream of owning a wardrobe that lasts. This piece has a certain 'vitality' to it. The gold-toned buttons are a sophisticated touch, and the tailoring is so sharp it feels like it was grown specifically for me.",
    rating: 5,
  },
  {
    user: "Bruno Bucciarati",
    comment:
      "This is the taste of a quality brand! The zippers are sturdy and move with incredible fluidness. You can tell the designers didn't betray their mission. It's a reliable piece that I would trust in any high-stakes situation.",
    rating: 5,
  },
  {
    user: "Jolyne Cujoh",
    comment:
      "I've been stuck in some pretty rough spots lately, and most clothes would've shredded to pieces by now. This tank top is surprisingly tough—it stretches without losing its form, which is exactly what I need when I'm at the end of my rope.",
    rating: 5,
  },
  {
    user: "Rohan Kishibe",
    comment:
      "I bought this purely for research, but I must admit the texture is fascinating. The way the ink-blue dye interacts with the cotton weave is something I haven't seen before. I might actually use this in my next chapter. It's... acceptable.",
    rating: 4,
  },
  {
    user: "Jean Pierre Polnareff",
    comment:
      "Non! I cannot believe how stylish this is! I wore it to a café and everyone was staring—probably at my incredible physique, but the shirt definitely helped! It's breathable, elegant, and ready for a trip across the world.",
    rating: 5,
  },
  {
    user: "Okuyasu Nijimura",
    comment:
      "OI JOSUKE! Look at this! I used [The Hand] to open the package and almost swiped the hoodie away by accident, but I'm glad I didn't! It's so warm and cozy, I think I'm gonna fall asleep right here on the sidewalk. Best thing I ever bought!",
    rating: 5,
  },
];

const rawProducts = Array.from({ length: 50 }, (_, i) => {
  const id = i + 1;
  const category = categories[i % categories.length];
  const style = styles[i % styles.length];
  const subStyleList = subStyles[category];
  const subStyle =
    subStyleList[Math.floor(Math.random() * subStyleList.length)];

  const colorCount = Math.floor(Math.random() * 4) + 1;
  const randomColorNames = [...colorNames]
    .sort(() => 0.5 - Math.random())
    .slice(0, colorCount);
  const primaryColorName = randomColorNames[0];
  const colorHexCodes = randomColorNames.map((name) => colorPalette[name]);

  const sizeCount = Math.floor(Math.random() * 5) + 2;
  const selectedSizes = sizeOptions.slice(0, sizeCount);

  const basePrice = Math.floor(Math.random() * 120 + 30);
  const hasDiscount = Math.random() > 0.6;
  const discountPrice = hasDiscount ? Math.floor(basePrice * 0.8) : null;

  const numReviews = Math.floor(Math.random() * 3) + 2;
  const selectedReviews = [...reviewBank]
    .sort(() => 0.5 - Math.random())
    .slice(0, numReviews);

  return {
    id,
    name: `${primaryColorName} ${subStyle} ${category}`,
    price: basePrice,
    discountPrice,
    discountPercent: hasDiscount ? "-20%" : null,
    description: `This ${style} ${subStyle} ${category} is crafted from a premium cotton blend.`,
    colors: colorHexCodes,
    sizes: selectedSizes,
    category,
    style,
    subStyle,
    reviews: selectedReviews,
    rating: (
      selectedReviews.reduce((acc, rev) => acc + rev.rating, 0) /
      selectedReviews.length
    ).toFixed(1),
    images: [],
    newArrival: false,
    topSeller: false,
    isMans: false,
    brand: brands[Math.floor(Math.random() * brands.length)],
  };
});

const shuffledForFlags = [...rawProducts].sort(() => 0.5 - Math.random());
shuffledForFlags.slice(0, 10).forEach((p) => (p.newArrival = true));
shuffledForFlags.slice(10, 20).forEach((p) => (p.topSeller = true));
shuffledForFlags.slice(20, 40).forEach((p) => (p.isMans = true));

export const products = rawProducts;
