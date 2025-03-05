export interface NewsArticle {
    abstract: string;
    web_url: string;
    multimedia: Array<{
      url: string;
      subtype: string;
      type: string;
    }>;
    pub_date: string;
    source: string;
  }
  
  export interface NewsResponse {
    response: {
      docs: NewsArticle[];
    };
  }
  