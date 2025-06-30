export interface GroupSchema {
  id?: number;
  created_at?: string;
  name: string;
  description: string;
  image_url?: string;
}
export interface GroupWithPostsSchema {
  id: number;
  created_at: string;
  name: string;
  description: string;
  post_count: number;
  image_url?: string;
}
