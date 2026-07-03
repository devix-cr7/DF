export type TKey = string;
type Dict = Record<string, string>;

// Shared UI chrome — nav, dashboard, status bar, common labels.
export const uiStrings: Record<string, Dict> = {
  "nav.search": {
    en: "Search tools…", ar: "بحث عن أداة…", es: "Buscar herramientas…",
    fr: "Rechercher un outil…", de: "Tools durchsuchen…", ja: "ツールを検索…", zh: "搜索工具…",
  },
  "nav.dashboard": {
    en: "Dashboard", ar: "الرئيسية", es: "Panel", fr: "Tableau de bord",
    de: "Übersicht", ja: "ダッシュボード", zh: "仪表盘",
  },
  "nav.favorites": {
    en: "Favorites", ar: "المفضلة", es: "Favoritos", fr: "Favoris",
    de: "Favoriten", ja: "お気に入り", zh: "收藏",
  },
  "nav.recent": {
    en: "Recently used", ar: "استُخدم مؤخراً", es: "Usado recientemente", fr: "Récemment utilisés",
    de: "Zuletzt verwendet", ja: "最近使った項目", zh: "最近使用",
  },
  "dashboard.welcome": {
    en: "Welcome back to DevForge", ar: "أهلاً بيك من جديد بـ DevForge",
    es: "Bienvenido de nuevo a DevForge", fr: "Bon retour sur DevForge",
    de: "Willkommen zurück bei DevForge", ja: "DevForgeへようこそ", zh: "欢迎回到 DevForge",
  },
  "dashboard.stats": {
    en: "{tools} tools · {cats} categories · everything runs locally",
    ar: "{tools} أداة · {cats} فئات · كلشي يشتغل محلياً",
    es: "{tools} herramientas · {cats} categorías · todo funciona localmente",
    fr: "{tools} outils · {cats} catégories · tout fonctionne en local",
    de: "{tools} Tools · {cats} Kategorien · alles läuft lokal",
    ja: "{tools}個のツール · {cats}カテゴリ · すべてローカルで動作",
    zh: "{tools} 个工具 · {cats} 个分类 · 一切均在本地运行",
  },
  "status.local": {
    en: "Local-first · no servers", ar: "محلي بالكامل · بدون سيرفرات",
    es: "Local primero · sin servidores", fr: "Local d'abord · sans serveur",
    de: "Lokal zuerst · keine Server", ja: "ローカルファースト · サーバー不要", zh: "本地优先 · 无服务器",
  },
  "status.private": {
    en: "Private by default", ar: "خصوصية افتراضية", es: "Privado por defecto",
    fr: "Privé par défaut", de: "Standardmäßig privat", ja: "デフォルトでプライベート", zh: "默认私密",
  },
  "status.installed": {
    en: "tools installed", ar: "أداة مثبتة", es: "herramientas instaladas",
    fr: "outils installés", de: "Tools installiert", ja: "個のツールがインストール済み", zh: "个工具已安装",
  },
  "topbar.toggle_theme": {
    en: "Toggle theme", ar: "تبديل المظهر", es: "Cambiar tema", fr: "Changer le thème",
    de: "Design wechseln", ja: "テーマ切替", zh: "切换主题",
  },
  "topbar.toggle_favorite": {
    en: "Toggle favorite", ar: "تبديل المفضلة", es: "Marcar favorito", fr: "Basculer favori",
    de: "Favorit umschalten", ja: "お気に入り切替", zh: "切换收藏",
  },
  "topbar.toggle_sidebar": {
    en: "Toggle sidebar", ar: "إظهار/إخفاء القائمة", es: "Mostrar/ocultar barra lateral",
    fr: "Afficher/masquer la barre latérale", de: "Seitenleiste umschalten",
    ja: "サイドバー切替", zh: "切换侧边栏",
  },
  "topbar.language": {
    en: "Language", ar: "اللغة", es: "Idioma", fr: "Langue", de: "Sprache", ja: "言語", zh: "语言",
  },
};

export const categoryStrings: Record<string, Dict> = {
  code: { en: "Code", ar: "الأكواد", es: "Código", fr: "Code", de: "Code", ja: "コード", zh: "代码" },
  design: { en: "Design", ar: "التصميم", es: "Diseño", fr: "Design", de: "Design", ja: "デザイン", zh: "设计" },
  database: { en: "Database", ar: "قواعد البيانات", es: "Base de datos", fr: "Base de données", de: "Datenbank", ja: "データベース", zh: "数据库" },
  api: { en: "API", ar: "الواجهات البرمجية", es: "API", fr: "API", de: "API", ja: "API", zh: "接口" },
  project: { en: "Project", ar: "المشروع", es: "Proyecto", fr: "Projet", de: "Projekt", ja: "プロジェクト", zh: "项目" },
  documents: { en: "Documents", ar: "المستندات", es: "Documentos", fr: "Documents", de: "Dokumente", ja: "ドキュメント", zh: "文档" },
  utilities: { en: "Utilities", ar: "أدوات مساعدة", es: "Utilidades", fr: "Utilitaires", de: "Dienstprogramme", ja: "ユーティリティ", zh: "实用工具" },
  "workspace-tools": { en: "Workspace", ar: "مساحة العمل", es: "Espacio de trabajo", fr: "Espace de travail", de: "Arbeitsbereich", ja: "ワークスペース", zh: "工作区" },
};

interface ToolStrings {
  title: Dict;
  desc: Dict;
}

export const toolStrings: Record<string, ToolStrings> = {
  json: {
    title: { en: "JSON Formatter", ar: "منسّق JSON", es: "Formateador JSON", fr: "Formateur JSON", de: "JSON-Formatierer", ja: "JSONフォーマッター", zh: "JSON 格式化" },
    desc: { en: "Format & validate", ar: "تنسيق وتحقق", es: "Formatear y validar", fr: "Formater et valider", de: "Formatieren & prüfen", ja: "整形と検証", zh: "格式化与校验" },
  },
  html: {
    title: { en: "HTML", ar: "HTML", es: "HTML", fr: "HTML", de: "HTML", ja: "HTML", zh: "HTML" },
    desc: { en: "Beautify & minify", ar: "تجميل وتصغير", es: "Embellecer y minificar", fr: "Formater et minifier", de: "Formatieren & verkleinern", ja: "整形と圧縮", zh: "美化与压缩" },
  },
  css: {
    title: { en: "CSS", ar: "CSS", es: "CSS", fr: "CSS", de: "CSS", ja: "CSS", zh: "CSS" },
    desc: { en: "Beautify & minify", ar: "تجميل وتصغير", es: "Embellecer y minificar", fr: "Formater et minifier", de: "Formatieren & verkleinern", ja: "整形と圧縮", zh: "美化与压缩" },
  },
  js: {
    title: { en: "JavaScript", ar: "JavaScript", es: "JavaScript", fr: "JavaScript", de: "JavaScript", ja: "JavaScript", zh: "JavaScript" },
    desc: { en: "Beautify & minify", ar: "تجميل وتصغير", es: "Embellecer y minificar", fr: "Formater et minifier", de: "Formatieren & verkleinern", ja: "整形と圧縮", zh: "美化与压缩" },
  },
  ts: {
    title: { en: "TypeScript", ar: "TypeScript", es: "TypeScript", fr: "TypeScript", de: "TypeScript", ja: "TypeScript", zh: "TypeScript" },
    desc: { en: "Beautify & minify", ar: "تجميل وتصغير", es: "Embellecer y minificar", fr: "Formater et minifier", de: "Formatieren & verkleinern", ja: "整形と圧縮", zh: "美化与压缩" },
  },
  markdown: {
    title: { en: "Markdown", ar: "ماركداون", es: "Markdown", fr: "Markdown", de: "Markdown", ja: "Markdown", zh: "Markdown" },
    desc: { en: "Live preview", ar: "معاينة حية", es: "Vista previa en vivo", fr: "Aperçu en direct", de: "Live-Vorschau", ja: "ライブプレビュー", zh: "实时预览" },
  },
  regex: {
    title: { en: "Regex Tester", ar: "فاحص التعابير النمطية", es: "Probador de regex", fr: "Testeur regex", de: "Regex-Tester", ja: "正規表現テスター", zh: "正则测试" },
    desc: { en: "Match & highlight", ar: "مطابقة وتظليل", es: "Coincidir y resaltar", fr: "Correspondance et surlignage", de: "Abgleichen & hervorheben", ja: "マッチとハイライト", zh: "匹配与高亮" },
  },
  base64: {
    title: { en: "Base64", ar: "Base64", es: "Base64", fr: "Base64", de: "Base64", ja: "Base64", zh: "Base64" },
    desc: { en: "Encode & decode", ar: "تشفير وفك تشفير", es: "Codificar y decodificar", fr: "Encoder et décoder", de: "Kodieren & dekodieren", ja: "エンコードとデコード", zh: "编码与解码" },
  },
  jwt: {
    title: { en: "JWT Decoder", ar: "فك تشفير JWT", es: "Decodificador JWT", fr: "Décodeur JWT", de: "JWT-Decoder", ja: "JWTデコーダー", zh: "JWT 解码" },
    desc: { en: "Inspect claims", ar: "فحص المحتوى", es: "Inspeccionar claims", fr: "Inspecter les claims", de: "Claims prüfen", ja: "クレームを確認", zh: "查看声明" },
  },
  hash: {
    title: { en: "Hash Generator", ar: "مولّد التجزئة", es: "Generador de hash", fr: "Générateur de hash", de: "Hash-Generator", ja: "ハッシュ生成", zh: "哈希生成器" },
    desc: { en: "SHA-1 / 256 / 384 / 512", ar: "SHA-1 / 256 / 384 / 512", es: "SHA-1 / 256 / 384 / 512", fr: "SHA-1 / 256 / 384 / 512", de: "SHA-1 / 256 / 384 / 512", ja: "SHA-1 / 256 / 384 / 512", zh: "SHA-1 / 256 / 384 / 512" },
  },
  uuid: {
    title: { en: "UUID Generator", ar: "مولّد UUID", es: "Generador UUID", fr: "Générateur UUID", de: "UUID-Generator", ja: "UUID生成", zh: "UUID 生成器" },
    desc: { en: "RFC 4122 v4", ar: "RFC 4122 v4", es: "RFC 4122 v4", fr: "RFC 4122 v4", de: "RFC 4122 v4", ja: "RFC 4122 v4", zh: "RFC 4122 v4" },
  },
  colors: {
    title: { en: "Color Tool", ar: "أداة الألوان", es: "Herramienta de color", fr: "Outil couleur", de: "Farbwerkzeug", ja: "カラーツール", zh: "颜色工具" },
    desc: { en: "Convert, shades, contrast", ar: "تحويل ودرجات وتباين", es: "Convertir, tonos, contraste", fr: "Conversion, nuances, contraste", de: "Konvertieren, Farbtöne, Kontrast", ja: "変換・階調・コントラスト", zh: "转换、色阶、对比度" },
  },
  svg: {
    title: { en: "SVG Preview", ar: "معاينة SVG", es: "Vista previa SVG", fr: "Aperçu SVG", de: "SVG-Vorschau", ja: "SVGプレビュー", zh: "SVG 预览" },
    desc: { en: "Preview & minify", ar: "معاينة وتصغير", es: "Vista previa y minificar", fr: "Aperçu et minification", de: "Vorschau & verkleinern", ja: "プレビューと圧縮", zh: "预览与压缩" },
  },
  fonts: {
    title: { en: "Font Pairing", ar: "توليف الخطوط", es: "Combinación de fuentes", fr: "Association de polices", de: "Schriftkombination", ja: "フォントペアリング", zh: "字体搭配" },
    desc: { en: "Preview Google Fonts", ar: "معاينة خطوط Google", es: "Vista previa Google Fonts", fr: "Aperçu Google Fonts", de: "Google Fonts-Vorschau", ja: "Google Fontsをプレビュー", zh: "预览 Google 字体" },
  },
  icons: {
    title: { en: "Icon Browser", ar: "متصفح الأيقونات", es: "Explorador de iconos", fr: "Explorateur d'icônes", de: "Icon-Browser", ja: "アイコンブラウザ", zh: "图标浏览器" },
    desc: { en: "Search & copy Lucide icons", ar: "بحث ونسخ أيقونات Lucide", es: "Buscar y copiar iconos Lucide", fr: "Rechercher et copier des icônes Lucide", de: "Lucide-Icons suchen & kopieren", ja: "Lucideアイコンを検索・コピー", zh: "搜索并复制 Lucide 图标" },
  },
  image: {
    title: { en: "Image Utilities", ar: "أدوات الصور", es: "Utilidades de imagen", fr: "Outils image", de: "Bild-Tools", ja: "画像ユーティリティ", zh: "图片工具" },
    desc: { en: "Resize, convert, compress", ar: "تغيير حجم وتحويل وضغط", es: "Redimensionar, convertir, comprimir", fr: "Redimensionner, convertir, compresser", de: "Größe ändern, konvertieren, komprimieren", ja: "リサイズ・変換・圧縮", zh: "调整大小、转换、压缩" },
  },
  "er-designer": {
    title: { en: "ER Designer", ar: "مصمم ER", es: "Diseñador ER", fr: "Concepteur ER", de: "ER-Designer", ja: "ER設計ツール", zh: "ER 设计器" },
    desc: { en: "Visual schema diagrams", ar: "مخططات بنية بصرية", es: "Diagramas visuales de esquema", fr: "Diagrammes de schéma visuels", de: "Visuelle Schemadiagramme", ja: "ビジュアルスキーマ図", zh: "可视化架构图" },
  },
  "sql-builder": {
    title: { en: "SQL Builder", ar: "باني SQL", es: "Constructor SQL", fr: "Générateur SQL", de: "SQL-Baukasten", ja: "SQLビルダー", zh: "SQL 构建器" },
    desc: { en: "Visual query builder", ar: "بناء استعلامات بصري", es: "Constructor visual de consultas", fr: "Générateur de requêtes visuel", de: "Visueller Abfragen-Builder", ja: "ビジュアルクエリビルダー", zh: "可视化查询构建" },
  },
  sqlite: {
    title: { en: "SQLite Viewer", ar: "عارض SQLite", es: "Visor SQLite", fr: "Visualiseur SQLite", de: "SQLite-Betrachter", ja: "SQLiteビューア", zh: "SQLite 查看器" },
    desc: { en: "Run SQL in-browser", ar: "تشغيل SQL بالمتصفح", es: "Ejecutar SQL en el navegador", fr: "Exécuter SQL dans le navigateur", de: "SQL im Browser ausführen", ja: "ブラウザでSQL実行", zh: "在浏览器中运行 SQL" },
  },
  "data-generator": {
    title: { en: "Data Generator", ar: "مولّد البيانات", es: "Generador de datos", fr: "Générateur de données", de: "Daten-Generator", ja: "データジェネレーター", zh: "数据生成器" },
    desc: { en: "Mock data, JSON/CSV", ar: "بيانات وهمية JSON/CSV", es: "Datos simulados, JSON/CSV", fr: "Données factices, JSON/CSV", de: "Testdaten, JSON/CSV", ja: "モックデータ JSON/CSV", zh: "模拟数据 JSON/CSV" },
  },
  url: {
    title: { en: "URL Tools", ar: "أدوات الروابط", es: "Herramientas URL", fr: "Outils URL", de: "URL-Tools", ja: "URLツール", zh: "URL 工具" },
    desc: { en: "Parse & encode/decode", ar: "تحليل وتشفير/فك تشفير", es: "Analizar y codificar/decodificar", fr: "Analyser et encoder/décoder", de: "Parsen & kodieren/dekodieren", ja: "解析とエンコード/デコード", zh: "解析与编解码" },
  },
  headers: {
    title: { en: "Header Builder", ar: "باني الترويسات", es: "Constructor de cabeceras", fr: "Générateur d'en-têtes", de: "Header-Baukasten", ja: "ヘッダービルダー", zh: "请求头构建器" },
    desc: { en: "curl, fetch, raw", ar: "curl, fetch, خام", es: "curl, fetch, raw", fr: "curl, fetch, brut", de: "curl, fetch, roh", ja: "curl, fetch, raw", zh: "curl、fetch、原始格式" },
  },
  "api-designer": {
    title: { en: "API Designer", ar: "مصمم API", es: "Diseñador de API", fr: "Concepteur d'API", de: "API-Designer", ja: "APIデザイナー", zh: "API 设计器" },
    desc: { en: "Sketch endpoints", ar: "تخطيط نقاط النهاية", es: "Bosquejar endpoints", fr: "Esquisser des endpoints", de: "Endpunkte skizzieren", ja: "エンドポイントを設計", zh: "规划接口端点" },
  },
  "project-planner": {
    title: { en: "Project Planner", ar: "مخطط المشروع", es: "Planificador de proyecto", fr: "Planificateur de projet", de: "Projektplaner", ja: "プロジェクトプランナー", zh: "项目计划器" },
    desc: { en: "Kanban board", ar: "لوحة كانبان", es: "Tablero Kanban", fr: "Tableau Kanban", de: "Kanban-Board", ja: "かんばんボード", zh: "看板" },
  },
  "folder-generator": {
    title: { en: "Folder Generator", ar: "مولّد المجلدات", es: "Generador de carpetas", fr: "Générateur de dossiers", de: "Ordner-Generator", ja: "フォルダジェネレーター", zh: "文件夹生成器" },
    desc: { en: "Tree to ZIP scaffold", ar: "شجرة إلى هيكل ZIP", es: "Árbol a estructura ZIP", fr: "Arborescence vers ZIP", de: "Baum zu ZIP-Gerüst", ja: "ツリーからZIP雛形", zh: "目录树转 ZIP 脚手架" },
  },
  architecture: {
    title: { en: "Architecture", ar: "البنية المعمارية", es: "Arquitectura", fr: "Architecture", de: "Architektur", ja: "アーキテクチャ", zh: "架构" },
    desc: { en: "System diagrams", ar: "مخططات النظام", es: "Diagramas de sistema", fr: "Diagrammes système", de: "Systemdiagramme", ja: "システム図", zh: "系统图" },
  },
  documentation: {
    title: { en: "Documentation", ar: "التوثيق", es: "Documentación", fr: "Documentation", de: "Dokumentation", ja: "ドキュメント作成", zh: "文档编写" },
    desc: { en: "Multi-page docs", ar: "توثيق متعدد الصفحات", es: "Documentos multipágina", fr: "Documents multi-pages", de: "Mehrseitige Dokumente", ja: "複数ページのドキュメント", zh: "多页面文档" },
  },
  flowcharts: {
    title: { en: "Flowcharts", ar: "مخططات التدفق", es: "Diagramas de flujo", fr: "Organigrammes", de: "Flussdiagramme", ja: "フローチャート", zh: "流程图" },
    desc: { en: "Process flow diagrams", ar: "مخططات تدفق العمليات", es: "Diagramas de flujo de proceso", fr: "Diagrammes de flux de processus", de: "Prozessablauf-Diagramme", ja: "プロセスフロー図", zh: "流程图表" },
  },
  csv: {
    title: { en: "CSV Viewer", ar: "عارض CSV", es: "Visor CSV", fr: "Visualiseur CSV", de: "CSV-Betrachter", ja: "CSVビューア", zh: "CSV 查看器" },
    desc: { en: "View & convert to JSON", ar: "عرض وتحويل إلى JSON", es: "Ver y convertir a JSON", fr: "Voir et convertir en JSON", de: "Anzeigen & zu JSON konvertieren", ja: "表示とJSON変換", zh: "查看并转换为 JSON" },
  },
  "text-studio": {
    title: { en: "Text Studio", ar: "استوديو النصوص", es: "Estudio de texto", fr: "Studio de texte", de: "Text-Studio", ja: "テキストスタジオ", zh: "文本工作室" },
    desc: { en: "Case, counting, replace", ar: "حالة الأحرف والعد والاستبدال", es: "Mayúsculas, conteo, reemplazo", fr: "Casse, comptage, remplacement", de: "Groß-/Kleinschreibung, Zählen, Ersetzen", ja: "大文字小文字・カウント・置換", zh: "大小写、计数、替换" },
  },
  pdf: {
    title: { en: "PDF Merge", ar: "دمج PDF", es: "Combinar PDF", fr: "Fusionner PDF", de: "PDF zusammenführen", ja: "PDF結合", zh: "PDF 合并" },
    desc: { en: "Combine PDFs locally", ar: "دمج ملفات PDF محلياً", es: "Combinar PDFs localmente", fr: "Fusionner des PDF localement", de: "PDFs lokal zusammenführen", ja: "PDFをローカルで結合", zh: "本地合并 PDF" },
  },
  qr: {
    title: { en: "QR Code", ar: "رمز QR", es: "Código QR", fr: "Code QR", de: "QR-Code", ja: "QRコード", zh: "二维码" },
    desc: { en: "Generate & download", ar: "توليد وتحميل", es: "Generar y descargar", fr: "Générer et télécharger", de: "Erstellen & herunterladen", ja: "生成してダウンロード", zh: "生成并下载" },
  },
  password: {
    title: { en: "Password Generator", ar: "مولّد كلمات المرور", es: "Generador de contraseñas", fr: "Générateur de mots de passe", de: "Passwort-Generator", ja: "パスワード生成", zh: "密码生成器" },
    desc: { en: "Strong & random", ar: "قوية وعشوائية", es: "Fuerte y aleatoria", fr: "Fort et aléatoire", de: "Stark & zufällig", ja: "強力かつランダム", zh: "强随机密码" },
  },
  timestamp: {
    title: { en: "Timestamp", ar: "الطابع الزمني", es: "Marca de tiempo", fr: "Horodatage", de: "Zeitstempel", ja: "タイムスタンプ", zh: "时间戳" },
    desc: { en: "Unix ⇄ human date", ar: "Unix ⇄ تاريخ بشري", es: "Unix ⇄ fecha legible", fr: "Unix ⇄ date lisible", de: "Unix ⇄ lesbares Datum", ja: "Unix ⇄ 日付", zh: "Unix ⇄ 可读日期" },
  },
  diff: {
    title: { en: "Diff Checker", ar: "فاحص الفروقات", es: "Comparador de texto", fr: "Comparateur de texte", de: "Diff-Prüfer", ja: "差分チェッカー", zh: "差异对比" },
    desc: { en: "Compare two texts", ar: "مقارنة نصين", es: "Comparar dos textos", fr: "Comparer deux textes", de: "Zwei Texte vergleichen", ja: "2つのテキストを比較", zh: "比较两段文本" },
  },
  clipboard: {
    title: { en: "Clipboard Board", ar: "لوحة الحافظة", es: "Portapapeles múltiple", fr: "Presse-papiers multiple", de: "Zwischenablage-Board", ja: "クリップボードボード", zh: "剪贴板面板" },
    desc: { en: "Multi-slot snippets", ar: "مقتطفات متعددة", es: "Fragmentos múltiples", fr: "Extraits multiples", de: "Mehrere Snippets", ja: "複数スニペット", zh: "多段代码片段" },
  },
  notes: {
    title: { en: "Notes", ar: "الملاحظات", es: "Notas", fr: "Notes", de: "Notizen", ja: "メモ", zh: "笔记" },
    desc: { en: "Quick local notes", ar: "ملاحظات محلية سريعة", es: "Notas locales rápidas", fr: "Notes locales rapides", de: "Schnelle lokale Notizen", ja: "簡易ローカルメモ", zh: "快速本地笔记" },
  },
  snippets: {
    title: { en: "Snippets", ar: "المقتطفات", es: "Fragmentos", fr: "Extraits", de: "Snippets", ja: "スニペット", zh: "代码片段" },
    desc: { en: "Reusable code library", ar: "مكتبة أكواد قابلة لإعادة الاستخدام", es: "Biblioteca de código reutilizable", fr: "Bibliothèque de code réutilisable", de: "Wiederverwendbare Code-Bibliothek", ja: "再利用可能なコードライブラリ", zh: "可复用代码库" },
  },
  history: {
    title: { en: "History", ar: "السجل", es: "Historial", fr: "Historique", de: "Verlauf", ja: "履歴", zh: "历史记录" },
    desc: { en: "Recently opened tools", ar: "الأدوات المفتوحة مؤخراً", es: "Herramientas abiertas recientemente", fr: "Outils récemment ouverts", de: "Zuletzt geöffnete Tools", ja: "最近開いたツール", zh: "最近打开的工具" },
  },
};
