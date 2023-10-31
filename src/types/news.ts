export interface NewsPost {
  objectID: string;
    created_at: string;
    story_url: string;
    title: string;
    author: string;
    url?: string;
    points?: string;
    story_text?: string;
    comment_text?: string;
    num_comments?: number;
    story_id?: number;
    story_title?: string;
    parent_id?: number;
    created_at_i?: number;
    _tags?: string[];
  }

export interface NewsApiResponse {
  exhaustive: {
    nbHits: boolean;
    typo: boolean;
  };
  hits: NewsPost[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  query: string;
  params: string;
  processingTimeMS: number;
}
