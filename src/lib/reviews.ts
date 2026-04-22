import { db, isFirebaseEnabled } from "@/lib/firebase";
import { sanitizeForFirestore } from "@/lib/firestoreSanitize";
import { Review } from "@/types/review";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const STORAGE_KEY = "urja_reviews_v1";
const REVIEWS_COLLECTION = "reviews";

export const SEEDED_REVIEWS: Review[] = [
  {
    id: "r-1",
    name: "KADAM YOGESH TUKARAM YOGESH",
    location: "Silvassa, Dadra and Nagar Haveli and Daman and Diu",
    dateLabel: "17-December-25",
    productName: "Potential Transformer",
    rating: 5,
    comment: "",
    tags: [],
    createdAt: Date.now() - 1000000,
  },
  {
    id: "r-2",
    name: "Guddu Ansari",
    location: "Dhanbad, Jharkhand",
    dateLabel: "06-September-25",
    productName: "Spring Charging Motor",
    rating: 4,
    comment: "Very nice man patel ge",
    tags: ["Response", "Quality", "Delivery"],
    createdAt: Date.now() - 900000,
  },
  {
    id: "r-3",
    name: "Harshit Kothari",
    location: "Rajkot, Gujarat",
    dateLabel: "27-August-22",
    productName: "Tripping Coil",
    rating: 4,
    comment: "Rating submitted",
    tags: ["Response"],
    createdAt: Date.now() - 800000,
  },
  {
    id: "r-4",
    name: "Dharmendra Bharti",
    location: "Adityapur, Jharkhand",
    dateLabel: "10-January-22",
    productName: "Spring Charging Motor",
    rating: 4,
    comment: "Very good",
    tags: ["Response", "Quality", "Delivery"],
    createdAt: Date.now() - 700000,
  },
  {
    id: "r-5",
    name: "Sanat Chakraborty",
    location: "Hyderabad, Telangana",
    dateLabel: "16-January-21",
    productName: "Tripping Coil",
    rating: 5,
    comment: "Very technically & reliability",
    tags: ["Response"],
    createdAt: Date.now() - 600000,
  },
  {
    id: "r-6",
    name: "Sanjay Tank",
    location: "Ahmedabad, Gujarat",
    dateLabel: "29-January-25",
    productName: "Spring Charging Motor",
    rating: 4,
    comment: "",
    tags: ["Response", "Quality", "Delivery"],
    createdAt: Date.now() - 500000,
  },
  {
    id: "r-7",
    name: "Shailesh Kumar",
    location: "Patna, Bihar",
    dateLabel: "25-September-24",
    productName: "Tripping Coil",
    rating: 3,
    comment: "240 volt AC Mein chahie tha 3 peace coil",
    tags: [],
    helpfulCount: 1,
    createdAt: Date.now() - 450000,
  },
  {
    id: "r-8",
    name: "Kishor Agrawal",
    location: "Manmad, Maharashtra",
    dateLabel: "26-June-24",
    productName: "Spring Charging Motor",
    rating: 5,
    comment: "Excellent",
    tags: [],
    sellerResponse: { dateLabel: "30-June-24", comment: "Thanks sir 🙏" },
    createdAt: Date.now() - 400000,
  },
  {
    id: "r-9",
    name: "Santosh Galande",
    location: "Nanded, Maharashtra",
    dateLabel: "16-May-24",
    productName: "VCB Panel Spares",
    rating: 4,
    comment: "",
    tags: ["Response", "Quality", "Delivery"],
    createdAt: Date.now() - 350000,
  },
  {
    id: "r-10",
    name: "Tejas Ravindra Patil",
    location: "Nashik, Maharashtra",
    dateLabel: "13-May-24",
    productName: "Spring Charging Motor",
    rating: 5,
    comment: "",
    tags: ["Response", "Quality", "Delivery"],
    createdAt: Date.now() - 300000,
  },
  {
    id: "r-11",
    name: "Suman Das",
    location: "Kolkata, West Bengal",
    dateLabel: "03-May-24",
    productName: "Spring Charging Motor",
    rating: 4,
    comment: "",
    tags: ["Response"],
    createdAt: Date.now() - 250000,
  },
  {
    id: "r-12",
    name: "V S Lingam",
    location: "Thane, Maharashtra",
    dateLabel: "22-March-24",
    productName: "Tripping Coil",
    rating: 5,
    comment:
      "Supplied all material as per our requirement and technically very good and explained and guide us as per exact spares required",
    tags: [],
    sellerResponse: { dateLabel: "05-April-24", comment: "Thanks" },
    createdAt: Date.now() - 200000,
  },
  {
    id: "r-13",
    name: "Kamal Sinha",
    location: "Kharagpur, West Bengal",
    dateLabel: "11-February-24",
    productName: "Spring Charging Motor",
    rating: 3,
    comment: "like",
    tags: [],
    sellerResponse: { dateLabel: "05-April-24", comment: "Thanks" },
    createdAt: Date.now() - 180000,
  },
  {
    id: "r-14",
    name: "Shwetank Bajpai",
    location: "Lucknow, Uttar Pradesh",
    dateLabel: "11-December-23",
    productName: "Spring Charging Motor",
    rating: 4,
    comment: "Support material was good",
    tags: [],
    sellerResponse: { dateLabel: "12-December-23", comment: "Thanks" },
    createdAt: Date.now() - 160000,
  },
  {
    id: "r-15",
    name: "Bikram Ray",
    location: "Dinhata, West Bengal",
    dateLabel: "31-August-22",
    productName: "Tripping Coil",
    rating: 4,
    comment: "",
    tags: ["Response", "Quality", "Delivery"],
    sellerResponse: { dateLabel: "31-August-22", comment: "Thanks" },
    createdAt: Date.now() - 140000,
  },
  {
    id: "r-16",
    name: "Kiran Kamble",
    location: "Vasai Virar, Maharashtra",
    dateLabel: "22-April-22",
    productName: "VCB Panel Spares",
    rating: 4,
    comment: "",
    tags: ["Response", "Delivery"],
    createdAt: Date.now() - 120000,
  },
  {
    id: "r-17",
    name: "Humed Hussain",
    location: "Uganda",
    dateLabel: "07-June-21",
    productName: "VCB Panel Spares",
    rating: 5,
    comment: "",
    tags: ["Response", "Quality"],
    sellerResponse: { dateLabel: "02-July-21", comment: "Hello Sir" },
    createdAt: Date.now() - 100000,
  },
  {
    id: "r-18",
    name: "Vynkat Alore",
    location: "Nashik, Maharashtra",
    dateLabel: "13-March-21",
    productName: "Spring Charging Motor",
    rating: 4,
    comment: "",
    tags: ["Response", "Quality", "Delivery"],
    createdAt: Date.now() - 90000,
  },
  {
    id: "r-19",
    name: "Vinod Kumar",
    location: "New Delhi, Delhi",
    dateLabel: "02-March-21",
    productName: "Spring Charging Motor",
    rating: 2,
    comment: "",
    tags: ["Response", "Delivery"],
    createdAt: Date.now() - 80000,
  },
  {
    id: "r-20",
    name: "Kalpesh Patil",
    location: "Pachora, Maharashtra",
    dateLabel: "18-February-21",
    productName: "Spring Charging Motor",
    rating: 4,
    comment: "Promt response and quoted as early as I want",
    tags: [],
    createdAt: Date.now() - 70000,
  },
];

function getReviewsLocal(): Review[] {
  if (typeof window === "undefined") return SEEDED_REVIEWS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEEDED_REVIEWS));
      return SEEDED_REVIEWS;
    }
    return JSON.parse(raw) as Review[];
  } catch {
    return SEEDED_REVIEWS;
  }
}

function saveReviewsLocal(reviews: Review[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  window.dispatchEvent(new Event("urja:reviews-updated"));
}

export async function getReviews(): Promise<Review[]> {
  if (!isFirebaseEnabled || !db) return getReviewsLocal();
  try {
    const q = query(collection(db, REVIEWS_COLLECTION), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    if (snap.empty) {
      // Don't auto-seed Firestore reviews; show seeded locally unless admin chooses.
      return getReviewsLocal();
    }
    return snap.docs.map((d) => d.data() as Review);
  } catch (e) {
    console.error("Firestore getReviews failed, using local fallback:", e);
    return getReviewsLocal();
  }
}

export async function addReview(input: Omit<Review, "id" | "createdAt">) {
  const newReview: Review = {
    ...input,
    id: `r-${Date.now()}`,
    createdAt: Date.now(),
  };

  if (isFirebaseEnabled && db) {
    await addDoc(collection(db, REVIEWS_COLLECTION), {
      ...sanitizeForFirestore(newReview),
      createdAt: serverTimestamp(),
    });
    window.dispatchEvent(new Event("urja:reviews-updated"));
    return newReview;
  }

  const next = [newReview, ...getReviewsLocal()];
  saveReviewsLocal(next);
  return newReview;
}

