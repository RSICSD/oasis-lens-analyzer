// Hand-written to match supabase/migrations/20260701000000_init_schema.sql.
// Regenerate with `supabase gen types typescript` once the project is linked.

type Table<Row, Insert, Update = Partial<Insert>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export interface Database {
  public: {
    Tables: {
      poc_units: Table<
        {
          id: string;
          name_ar: string;
          type: "mill" | "silo" | "packaging" | "admin" | "training" | "energy";
          status: "planned" | "in_progress" | "done" | "blocked";
          x: number;
          y: number;
          z: number;
          updated_at: string;
        },
        {
          id: string;
          name_ar: string;
          type: "mill" | "silo" | "packaging" | "admin" | "training" | "energy";
          status: "planned" | "in_progress" | "done" | "blocked";
          x?: number;
          y?: number;
          z?: number;
        }
      >;
      poc_work_packages: Table<
        {
          id: string;
          unit_id: string;
          name_ar: string;
          category: "agreement" | "due_diligence" | "mou" | "procurement" | "civil" | "training";
          status: "planned" | "in_progress" | "done" | "blocked";
          progress_pct: number;
          planned_start: string | null;
          planned_end: string | null;
          actual_start: string | null;
          actual_end: string | null;
          doc_url: string | null;
          updated_at: string;
        },
        {
          id: string;
          unit_id: string;
          name_ar: string;
          category: "agreement" | "due_diligence" | "mou" | "procurement" | "civil" | "training";
          status: "planned" | "in_progress" | "done" | "blocked";
          progress_pct?: number;
          planned_start?: string | null;
          planned_end?: string | null;
          actual_start?: string | null;
          actual_end?: string | null;
          doc_url?: string | null;
        }
      >;
      poc_funding: Table<
        {
          work_package_id: string;
          allocated_usd: number;
          received_usd: number;
          updated_at: string;
        },
        {
          work_package_id: string;
          allocated_usd?: number;
          received_usd?: number;
        }
      >;
      poc_documents: Table<
        {
          id: string;
          title_ar: string;
          type: string;
          url: string | null;
          work_package_id: string | null;
        },
        {
          id: string;
          title_ar: string;
          type: string;
          url?: string | null;
          work_package_id?: string | null;
        }
      >;
      contact_submissions: Table<
        {
          id: string;
          name: string;
          email: string;
          message: string;
          created_at: string;
        },
        {
          name: string;
          email: string;
          message: string;
        },
        never
      >;
      donation_intents: Table<
        {
          id: string;
          amount_usd: number;
          recurring: "once" | "monthly";
          status: "pending" | "completed" | "cancelled";
          email: string | null;
          created_at: string;
        },
        {
          amount_usd: number;
          recurring: "once" | "monthly";
          email?: string | null;
        },
        never
      >;
      news_posts: Table<
        {
          id: string;
          date: string;
          title_ar: string;
          title_en: string;
          excerpt_ar: string;
          excerpt_en: string;
          created_at: string;
        },
        {
          id: string;
          date: string;
          title_ar: string;
          title_en: string;
          excerpt_ar: string;
          excerpt_en: string;
        }
      >;
      articles: Table<
        {
          id: string;
          date: string;
          author_ar: string;
          author_en: string;
          title_ar: string;
          title_en: string;
          excerpt_ar: string;
          excerpt_en: string;
          created_at: string;
        },
        {
          id: string;
          date: string;
          author_ar: string;
          author_en: string;
          title_ar: string;
          title_en: string;
          excerpt_ar: string;
          excerpt_en: string;
        }
      >;
      reports: Table<
        {
          id: string;
          date: string;
          title_ar: string;
          title_en: string;
          description_ar: string;
          description_en: string;
          url: string;
          pages: number;
          created_at: string;
        },
        {
          id: string;
          date: string;
          title_ar: string;
          title_en: string;
          description_ar: string;
          description_en: string;
          url: string;
          pages?: number;
        }
      >;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
