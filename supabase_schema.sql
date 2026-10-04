-- =========================================================
-- سكربت إعداد قاعدة بيانات مشروع الخوارزميات على Supabase
-- مدرسة الوصال العامرة - بإشراف الأستاذ حمزة
-- =========================================================

-- 1. إنشاء جدول تقييمات ورصد درجات الأستاذ (project_evaluations)
CREATE TABLE IF NOT EXISTS public.project_evaluations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_title TEXT NOT NULL DEFAULT 'الخوارزميات - المنصة التفاعلية المتقدمة',
    school_name TEXT NOT NULL DEFAULT 'مدرسة الوصال العامرة',
    teacher_name TEXT NOT NULL DEFAULT 'الأستاذ حمزة',
    grade TEXT NOT NULL DEFAULT '',
    max_grade TEXT NOT NULL DEFAULT '100',
    notes TEXT DEFAULT '',
    learning_advice TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. إنشاء جدول سجل الزيارات والملاحظات التفاعلية (site_feedbacks)
CREATE TABLE IF NOT EXISTS public.site_feedbacks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_name TEXT DEFAULT 'زائر المنصة',
    message TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. تفعيل نظام الأمان على مستوى الصفوف (Row Level Security - RLS)
ALTER TABLE public.project_evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_feedbacks ENABLE ROW LEVEL SECURITY;

-- 4. سياسات الوصول لجدول التقييمات
DROP POLICY IF EXISTS "Allow anonymous insert on project_evaluations" ON public.project_evaluations;
CREATE POLICY "Allow anonymous insert on project_evaluations"
ON public.project_evaluations
FOR INSERT
TO public
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous select on project_evaluations" ON public.project_evaluations;
CREATE POLICY "Allow anonymous select on project_evaluations"
ON public.project_evaluations
FOR SELECT
TO public
USING (true);

-- 5. سياسات الوصول لجدول الملاحظات
DROP POLICY IF EXISTS "Allow anonymous insert on site_feedbacks" ON public.site_feedbacks;
CREATE POLICY "Allow anonymous insert on site_feedbacks"
ON public.site_feedbacks
FOR INSERT
TO public
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous select on site_feedbacks" ON public.site_feedbacks;
CREATE POLICY "Allow anonymous select on site_feedbacks"
ON public.site_feedbacks
FOR SELECT
TO public
USING (true);

-- 6. فهارس سريعة لترتيب السجلات حسب الأحدث
CREATE INDEX IF NOT EXISTS idx_project_evaluations_created_at ON public.project_evaluations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_site_feedbacks_created_at ON public.site_feedbacks(created_at DESC);
