import { FinalPost } from "@/components/editor";

export const generateFormData = (post: FinalPost) => {
  const formData = new FormData();
  for (let key in post) {
    const value = (post as any)[key];
    if (key === "tags" && value.trim()) {
      // loops through array to remove blank spaces
      const tags = value.split(",").map((tag: string) => tag.trim());
      formData.append("tags", JSON.stringify(tags));
    } else {
      formData.append(key, value);
    }
  }
};
