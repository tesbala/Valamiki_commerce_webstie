import { collection, doc, getDoc, getDocs, query, orderBy, where } from "firebase/firestore";
import { getDb } from "@/lib/firebase";

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isPublished: boolean;
  dateLabel: string;
}

function toDateLabel(ts: unknown): string {
  try {
    // Firestore Timestamp has .toDate()
    const d = (ts as { toDate(): Date }).toDate();
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return "";
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const db = getDb();
    if (!db) return [];
    const q = query(
      collection(db, "blog"),
      where("isPublished", "==", true),
      orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const r = d.data();
      return {
        id: d.id,
        title: r.title ?? "",
        description: r.description ?? "",
        imageUrl: r.imageUrl ?? "",
        isPublished: r.isPublished ?? true,
        dateLabel: toDateLabel(r.createdAt),
      };
    });
  } catch {
    return [];
  }
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const db = getDb();
    if (!db) return null;
    const snap = await getDoc(doc(db, "blog", id));
    if (!snap.exists()) return null;
    const r = snap.data();
    if (!r.isPublished) return null;
    return {
      id: snap.id,
      title: r.title ?? "",
      description: r.description ?? "",
      imageUrl: r.imageUrl ?? "",
      isPublished: r.isPublished ?? true,
      dateLabel: toDateLabel(r.createdAt),
    };
  } catch {
    return null;
  }
}
