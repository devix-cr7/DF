export type TKey = string;
type Dict = Record<string, string>;

// Frequently reused words/phrases across many tools — buttons, labels, placeholders.
export const commonStrings: Record<string, Dict> = {
  copy: { en: "Copy", ar: "نسخ", es: "Copiar", fr: "Copier", de: "Kopieren", ja: "コピー", zh: "复制" },
  copied: { en: "Copied", ar: "تم النسخ", es: "Copiado", fr: "Copié", de: "Kopiert", ja: "コピー済み", zh: "已复制" },
  clear: { en: "Clear", ar: "مسح", es: "Limpiar", fr: "Effacer", de: "Leeren", ja: "クリア", zh: "清空" },
  download: { en: "Download", ar: "تحميل", es: "Descargar", fr: "Télécharger", de: "Herunterladen", ja: "ダウンロード", zh: "下载" },
  upload: { en: "Upload", ar: "رفع", es: "Subir", fr: "Importer", de: "Hochladen", ja: "アップロード", zh: "上传" },
  generate: { en: "Generate", ar: "توليد", es: "Generar", fr: "Générer", de: "Generieren", ja: "生成", zh: "生成" },
  regenerate: { en: "Regenerate", ar: "توليد من جديد", es: "Regenerar", fr: "Régénérer", de: "Neu generieren", ja: "再生成", zh: "重新生成" },
  add: { en: "Add", ar: "إضافة", es: "Añadir", fr: "Ajouter", de: "Hinzufügen", ja: "追加", zh: "添加" },
  delete: { en: "Delete", ar: "حذف", es: "Eliminar", fr: "Supprimer", de: "Löschen", ja: "削除", zh: "删除" },
  remove: { en: "Remove", ar: "إزالة", es: "Quitar", fr: "Retirer", de: "Entfernen", ja: "削除", zh: "移除" },
  beautify: { en: "Beautify", ar: "تجميل", es: "Embellecer", fr: "Formater", de: "Formatieren", ja: "整形", zh: "美化" },
  minify: { en: "Minify", ar: "تصغير", es: "Minificar", fr: "Minifier", de: "Verkleinern", ja: "圧縮", zh: "压缩" },
  paste: { en: "Paste", ar: "لصق", es: "Pegar", fr: "Coller", de: "Einfügen", ja: "貼り付け", zh: "粘贴" },
  search: { en: "Search", ar: "بحث", es: "Buscar", fr: "Rechercher", de: "Suchen", ja: "検索", zh: "搜索" },
  encode: { en: "Encode", ar: "تشفير", es: "Codificar", fr: "Encoder", de: "Kodieren", ja: "エンコード", zh: "编码" },
  decode: { en: "Decode", ar: "فك التشفير", es: "Decodificar", fr: "Décoder", ja: "デコード", de: "Dekodieren", zh: "解码" },
  new: { en: "New", ar: "جديد", es: "Nuevo", fr: "Nouveau", de: "Neu", ja: "新規", zh: "新建" },
  save: { en: "Save", ar: "حفظ", es: "Guardar", fr: "Enregistrer", de: "Speichern", ja: "保存", zh: "保存" },
  title: { en: "Title", ar: "العنوان", es: "Título", fr: "Titre", de: "Titel", ja: "タイトル", zh: "标题" },
  export: { en: "Export", ar: "تصدير", es: "Exportar", fr: "Exporter", de: "Exportieren", ja: "エクスポート", zh: "导出" },
  replace_all: { en: "Replace all", ar: "استبدال الكل", es: "Reemplazar todo", fr: "Tout remplacer", de: "Alles ersetzen", ja: "すべて置換", zh: "全部替换" },
  find: { en: "Find…", ar: "بحث…", es: "Buscar…", fr: "Rechercher…", de: "Suchen…", ja: "検索…", zh: "查找…" },
  replace_with: { en: "Replace with…", ar: "استبدال بـ…", es: "Reemplazar con…", fr: "Remplacer par…", de: "Ersetzen durch…", ja: "置換後…", zh: "替换为…" },
  characters: { en: "Characters", ar: "أحرف", es: "Caracteres", fr: "Caractères", de: "Zeichen", ja: "文字数", zh: "字符" },
  words: { en: "Words", ar: "كلمات", es: "Palabras", fr: "Mots", de: "Wörter", ja: "単語数", zh: "单词" },
  lines: { en: "Lines", ar: "أسطر", es: "Líneas", fr: "Lignes", de: "Zeilen", ja: "行数", zh: "行数" },
  sentences: { en: "Sentences", ar: "جُمل", es: "Oraciones", fr: "Phrases", de: "Sätze", ja: "文数", zh: "句子" },
  length: { en: "Length", ar: "الطول", es: "Longitud", fr: "Longueur", de: "Länge", ja: "長さ", zh: "长度" },
  quality: { en: "Quality", ar: "الجودة", es: "Calidad", fr: "Qualité", de: "Qualität", ja: "画質", zh: "质量" },
  width: { en: "Width", ar: "العرض", es: "Ancho", fr: "Largeur", de: "Breite", ja: "幅", zh: "宽度" },
  height: { en: "Height", ar: "الارتفاع", es: "Alto", fr: "Hauteur", de: "Höhe", ja: "高さ", zh: "高度" },
  format: { en: "Format", ar: "الصيغة", es: "Formato", fr: "Format", de: "Format", ja: "形式", zh: "格式" },
  original: { en: "Original", ar: "الأصلي", es: "Original", fr: "Original", de: "Original", ja: "元の", zh: "原始" },
  output: { en: "Output", ar: "الناتج", es: "Salida", fr: "Sortie", de: "Ausgabe", ja: "出力", zh: "输出" },
  no_data_yet: { en: "Nothing here yet", ar: "لا يوجد شي هسه", es: "Nada aquí todavía", fr: "Rien pour le moment", de: "Noch nichts vorhanden", ja: "まだありません", zh: "暂无内容" },
  rows: { en: "Rows", ar: "الصفوف", es: "Filas", fr: "Lignes", de: "Zeilen", ja: "行", zh: "行数" },
  columns: { en: "Columns", ar: "الأعمدة", es: "Columnas", fr: "Colonnes", de: "Spalten", ja: "列", zh: "列" },
  table: { en: "Table", ar: "الجدول", es: "Tabla", fr: "Table", de: "Tabelle", ja: "テーブル", zh: "表" },
  run: { en: "Run", ar: "تشغيل", es: "Ejecutar", fr: "Exécuter", de: "Ausführen", ja: "実行", zh: "运行" },
  open_file: { en: "Open file", ar: "فتح ملف", es: "Abrir archivo", fr: "Ouvrir un fichier", de: "Datei öffnen", ja: "ファイルを開く", zh: "打开文件" },
  merge: { en: "Merge", ar: "دمج", es: "Combinar", fr: "Fusionner", de: "Zusammenführen", ja: "結合", zh: "合并" },
};

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

export const toolInternalStrings: Record<string, Dict> = {
  // JSON
  "json.paste_placeholder": { en: "Paste JSON here…", ar: "الصق JSON هنا…", es: "Pega JSON aquí…", fr: "Collez du JSON ici…", de: "JSON hier einfügen…", ja: "ここにJSONを貼り付け…", zh: "在此粘贴 JSON…" },
  "json.formatted_placeholder": { en: "Formatted output…", ar: "الناتج المنسّق…", es: "Salida formateada…", fr: "Sortie formatée…", de: "Formatierte Ausgabe…", ja: "整形結果…", zh: "格式化输出…" },
  "json.spaces_2": { en: "2 spaces", ar: "مسافتان", es: "2 espacios", fr: "2 espaces", de: "2 Leerzeichen", ja: "スペース2", zh: "2 个空格" },
  "json.spaces_4": { en: "4 spaces", ar: "4 مسافات", es: "4 espacios", fr: "4 espaces", de: "4 Leerzeichen", ja: "スペース4", zh: "4 个空格" },
  "json.tab": { en: "Tab", ar: "تاب", es: "Tabulación", fr: "Tabulation", de: "Tab", ja: "タブ", zh: "制表符" },
  // Base64
  "base64.encode": { en: "encode", ar: "تشفير", es: "codificar", fr: "encoder", de: "kodieren", ja: "エンコード", zh: "编码" },
  "base64.decode": { en: "decode", ar: "فك التشفير", es: "decodificar", fr: "décoder", de: "dekodieren", ja: "デコード", zh: "解码" },
  "base64.swap_mode": { en: "Swap mode", ar: "تبديل الوضع", es: "Cambiar modo", fr: "Changer de mode", de: "Modus wechseln", ja: "モード切替", zh: "切换模式" },
  "base64.encode_error": { en: "Could not encode this input.", ar: "تعذّر تشفير هذا الإدخال.", es: "No se pudo codificar esta entrada.", fr: "Impossible d'encoder cette entrée.", de: "Eingabe konnte nicht kodiert werden.", ja: "この入力をエンコードできませんでした。", zh: "无法编码此输入。" },
  "base64.decode_error": { en: "Invalid Base64 string.", ar: "نص Base64 غير صالح.", es: "Cadena Base64 no válida.", fr: "Chaîne Base64 invalide.", de: "Ungültige Base64-Zeichenkette.", ja: "無効なBase64文字列です。", zh: "无效的 Base64 字符串。" },
  // UUID
  "uuid.generate": { en: "Generate", ar: "توليد", es: "Generar", fr: "Générer", de: "Generieren", ja: "生成", zh: "生成" },
  // Hash — no unique strings needed beyond common
  // JWT
  "jwt.paste_placeholder": { en: "Paste a JWT…", ar: "الصق JWT…", es: "Pega un JWT…", fr: "Collez un JWT…", de: "JWT einfügen…", ja: "JWTを貼り付け…", zh: "粘贴 JWT…" },
  "jwt.header": { en: "HEADER", ar: "الترويسة", es: "CABECERA", fr: "EN-TÊTE", de: "HEADER", ja: "ヘッダー", zh: "头部" },
  "jwt.payload": { en: "PAYLOAD", ar: "المحتوى", es: "CARGA", fr: "CHARGE UTILE", de: "PAYLOAD", ja: "ペイロード", zh: "载荷" },
  "hash.placeholder": { en: "Text to hash…", ar: "نص للتجزئة…", es: "Texto para aplicar hash…", fr: "Texte à hacher…", de: "Text für Hash…", ja: "ハッシュ化するテキスト…", zh: "要哈希的文本…" },
  "jwt.invalid": { en: "Not a valid JWT structure.", ar: "بنية JWT غير صالحة.", es: "Estructura JWT no válida.", fr: "Structure JWT invalide.", de: "Ungültige JWT-Struktur.", ja: "無効なJWT構造です。", zh: "无效的 JWT 结构。" },
  // Regex
  "regex.pattern": { en: "Pattern", ar: "النمط", es: "Patrón", fr: "Motif", de: "Muster", ja: "パターン", zh: "模式" },
  "regex.flags": { en: "flags", ar: "خيارات", es: "banderas", fr: "drapeaux", de: "Flags", ja: "フラグ", zh: "标志" },
  "regex.matches": { en: "matches", ar: "تطابقات", es: "coincidencias", fr: "correspondances", de: "Treffer", ja: "件一致", zh: "个匹配" },
  // Markdown — uses common only
  // CSS/HTML/JS/TS — uses common only
  // Colors
  "colors.shades": { en: "Shades", ar: "الدرجات", es: "Tonos", fr: "Nuances", de: "Farbtöne", ja: "階調", zh: "色阶" },
  "colors.contrast_check": { en: "Contrast check", ar: "فحص التباين", es: "Verificar contraste", fr: "Vérifier le contraste", de: "Kontrast prüfen", ja: "コントラストチェック", zh: "对比度检查" },
  "colors.sample": { en: "Aa Sample", ar: "أ ب نموذج", es: "Aa Ejemplo", fr: "Aa Exemple", de: "Aa Beispiel", ja: "Aaサンプル", zh: "Aa 示例" },
  "colors.ratio": { en: "Ratio", ar: "النسبة", es: "Relación", fr: "Ratio", de: "Verhältnis", ja: "比率", zh: "比率" },
  "colors.foreground": { en: "Foreground", ar: "لون النص", es: "Primer plano", fr: "Premier plan", de: "Vordergrund", ja: "前景色", zh: "前景色" },
  "colors.background": { en: "Background", ar: "الخلفية", es: "Fondo", fr: "Arrière-plan", de: "Hintergrund", ja: "背景色", zh: "背景色" },
  "colors.fail": { en: "Fail", ar: "راسب", es: "Falla", fr: "Échec", de: "Fehler", ja: "不合格", zh: "不合格" },
  // SVG
  "svg.preview_hint": { en: "Paste valid SVG markup to preview", ar: "الصق كود SVG صالح للمعاينة", es: "Pega SVG válido para previsualizar", fr: "Collez du SVG valide pour l'aperçu", de: "Gültiges SVG einfügen zur Vorschau", ja: "有効なSVGを貼り付けてプレビュー", zh: "粘贴有效的 SVG 代码以预览" },
  // Fonts
  "fonts.heading_font": { en: "Heading font", ar: "خط العناوين", es: "Fuente de título", fr: "Police du titre", de: "Überschriftschrift", ja: "見出しフォント", zh: "标题字体" },
  "fonts.body_font": { en: "Body font", ar: "خط النص", es: "Fuente del cuerpo", fr: "Police du texte", de: "Textschrift", ja: "本文フォント", zh: "正文字体" },
  "fonts.sample_heading": { en: "Build tools that feel like home", ar: "ابني أدوات تحس فيها بالراحة", es: "Crea herramientas que se sientan como en casa", fr: "Créez des outils qui donnent une impression de familiarité", de: "Baue Tools, die sich vertraut anfühlen", ja: "居心地の良いツールを作ろう", zh: "打造宾至如归的工具" },
  "fonts.sample_body": { en: "DevForge brings every developer utility into one focused workspace — no context switching, no ads, no servers. Everything runs locally, instantly, and looks the way premium software should.", ar: "يجمع DevForge كل أدوات المطور بمساحة عمل واحدة مركّزة - بدون تنقل بين تطبيقات، بدون إعلانات، بدون سيرفرات. كل شي يشتغل محلياً وفوراً ويبان بشكل احترافي.", es: "DevForge reúne todas las utilidades de desarrollo en un solo espacio de trabajo enfocado, sin anuncios ni servidores. Todo funciona localmente y al instante.", fr: "DevForge réunit tous les outils de développement dans un espace de travail unique — sans publicité, sans serveur. Tout fonctionne localement et instantanément.", de: "DevForge vereint alle Entwickler-Tools in einem fokussierten Arbeitsbereich — ohne Werbung, ohne Server. Alles läuft lokal und sofort.", ja: "DevForgeはすべての開発者ツールを一つのワークスペースに集約 — 広告もサーバーも不要。すべてローカルで即座に動作します。", zh: "DevForge 将所有开发者工具汇聚于一个专注的工作区 —— 无广告、无服务器,一切均在本地即时运行。" },
  // Icon browser
  "icons.search_placeholder": { en: "Search icons…", ar: "بحث عن أيقونة…", es: "Buscar iconos…", fr: "Rechercher des icônes…", de: "Icons durchsuchen…", ja: "アイコンを検索…", zh: "搜索图标…" },
  "icons.copied_import": { en: "Import statement copied", ar: "تم نسخ سطر الاستيراد", es: "Declaración de importación copiada", fr: "Instruction d'import copiée", de: "Import-Anweisung kopiert", ja: "importステートメントをコピーしました", zh: "已复制导入语句" },
  // Image
  "image.click_upload": { en: "Click to upload an image", ar: "اضغط لرفع صورة", es: "Haz clic para subir una imagen", fr: "Cliquez pour importer une image", de: "Klicken zum Hochladen eines Bildes", ja: "クリックして画像をアップロード", zh: "点击上传图片" },
  "image.replace": { en: "Replace image", ar: "استبدال الصورة", es: "Reemplazar imagen", fr: "Remplacer l'image", de: "Bild ersetzen", ja: "画像を置き換え", zh: "替换图片" },
  "image.original": { en: "Original", ar: "الأصلي", es: "Original", fr: "Original", de: "Original", ja: "元のサイズ", zh: "原始" },
  "image.smaller": { en: "smaller", ar: "أصغر", es: "más pequeño", fr: "plus petit", de: "kleiner", ja: "小さい", zh: "更小" },
  "image.larger": { en: "larger", ar: "أكبر", es: "más grande", fr: "plus grand", de: "größer", ja: "大きい", zh: "更大" },
  "image.output": { en: "Output", ar: "الناتج", es: "Salida", fr: "Sortie", de: "Ausgabe", ja: "出力", zh: "输出" },
  // ER Designer
  "er.add_table": { en: "Table", ar: "جدول", es: "Tabla", fr: "Table", de: "Tabelle", ja: "テーブル", zh: "表" },
  "er.field": { en: "field", ar: "حقل", es: "campo", fr: "champ", de: "Feld", ja: "フィールド", zh: "字段" },
  "er.primary_key": { en: "Primary key", ar: "مفتاح أساسي", es: "Clave primaria", fr: "Clé primaire", de: "Primärschlüssel", ja: "主キー", zh: "主键" },
  // SQL Builder
  "sql.where": { en: "WHERE", ar: "شرط WHERE", es: "WHERE", fr: "WHERE", de: "WHERE", ja: "WHERE", zh: "条件 WHERE" },
  "sql.add_condition": { en: "Add condition", ar: "إضافة شرط", es: "Añadir condición", fr: "Ajouter une condition", de: "Bedingung hinzufügen", ja: "条件を追加", zh: "添加条件" },
  "sql.order_by": { en: "Order by", ar: "الترتيب حسب", es: "Ordenar por", fr: "Trier par", de: "Sortieren nach", ja: "並び順", zh: "排序方式" },
  "sql.limit": { en: "Limit", ar: "الحد الأقصى", es: "Límite", fr: "Limite", de: "Limit", ja: "件数上限", zh: "限制条数" },
  "sql.paste_hint": { en: "Or paste SQL to format", ar: "أو الصق SQL لتنسيقه", es: "O pega SQL para formatear", fr: "Ou collez du SQL à formater", de: "Oder SQL zum Formatieren einfügen", ja: "またはSQLを貼り付けて整形", zh: "或粘贴 SQL 进行格式化" },
  "sql.generated": { en: "Generated SQL", ar: "SQL الناتج", es: "SQL generado", fr: "SQL généré", de: "Generiertes SQL", ja: "生成されたSQL", zh: "生成的 SQL" },
  "sql.column_placeholder": { en: "column", ar: "عمود", es: "columna", fr: "colonne", de: "Spalte", ja: "列", zh: "列" },
  "sql.table_label": { en: "Table", ar: "الجدول", es: "Tabla", fr: "Table", de: "Tabelle", ja: "テーブル", zh: "表" },
  "sql.columns_label": { en: "Columns", ar: "الأعمدة", es: "Columnas", fr: "Colonnes", de: "Spalten", ja: "列", zh: "列" },
  // SQLite
  "sqlite.loading": { en: "Loading SQLite engine…", ar: "جاري تحميل محرك SQLite…", es: "Cargando motor SQLite…", fr: "Chargement du moteur SQLite…", de: "SQLite-Engine wird geladen…", ja: "SQLiteエンジンを読み込み中…", zh: "正在加载 SQLite 引擎…" },
  "sqlite.run_hint": { en: "Run a query to see results", ar: "شغّل استعلاماً لعرض النتائج", es: "Ejecuta una consulta para ver resultados", fr: "Exécutez une requête pour voir les résultats", de: "Abfrage ausführen, um Ergebnisse zu sehen", ja: "クエリを実行すると結果が表示されます", zh: "运行查询以查看结果" },
  "sqlite.open_file": { en: "Open .sqlite", ar: "فتح ملف .sqlite", es: "Abrir .sqlite", fr: "Ouvrir .sqlite", de: ".sqlite öffnen", ja: ".sqliteを開く", zh: "打开 .sqlite" },
  // Data Generator
  "data.rows": { en: "Rows", ar: "عدد الصفوف", es: "Filas", fr: "Lignes", de: "Zeilen", ja: "行数", zh: "行数" },
  "data.add_field": { en: "Add field", ar: "إضافة حقل", es: "Añadir campo", fr: "Ajouter un champ", de: "Feld hinzufügen", ja: "フィールドを追加", zh: "添加字段" },
  // URL Tools
  "url.parse": { en: "Parse", ar: "تحليل", es: "Analizar", fr: "Analyser", de: "Analysieren", ja: "解析", zh: "解析" },
  "url.encode_decode": { en: "Encode / Decode", ar: "تشفير / فك تشفير", es: "Codificar / Decodificar", fr: "Encoder / Décoder", de: "Kodieren / Dekodieren", ja: "エンコード / デコード", zh: "编码 / 解码" },
  "url.invalid": { en: "Not a valid absolute URL.", ar: "الرابط غير صالح.", es: "No es una URL absoluta válida.", fr: "URL absolue non valide.", de: "Keine gültige absolute URL.", ja: "有効な絶対URLではありません。", zh: "不是有效的绝对 URL。" },
  "url.query_params": { en: "Query Parameters", ar: "معاملات الاستعلام", es: "Parámetros de consulta", fr: "Paramètres de requête", de: "Abfrageparameter", ja: "クエリパラメータ", zh: "查询参数" },
  "url.paste_placeholder": { en: "Paste a URL…", ar: "الصق رابط…", es: "Pega una URL…", fr: "Collez une URL…", de: "URL einfügen…", ja: "URLを貼り付け…", zh: "粘贴网址…" },
  "url.protocol": { en: "Protocol", ar: "البروتوكول", es: "Protocolo", fr: "Protocole", de: "Protokoll", ja: "プロトコル", zh: "协议" },
  "url.host": { en: "Host", ar: "المضيف", es: "Host", fr: "Hôte", de: "Host", ja: "ホスト", zh: "主机" },
  "url.hostname": { en: "Hostname", ar: "اسم المضيف", es: "Nombre de host", fr: "Nom d'hôte", de: "Hostname", ja: "ホスト名", zh: "主机名" },
  "url.port": { en: "Port", ar: "المنفذ", es: "Puerto", fr: "Port", de: "Port", ja: "ポート", zh: "端口" },
  "url.pathname": { en: "Pathname", ar: "المسار", es: "Ruta", fr: "Chemin", de: "Pfad", ja: "パス", zh: "路径" },
  "url.hash": { en: "Hash", ar: "الجزء المرجعي", es: "Hash", fr: "Fragment", de: "Hash", ja: "ハッシュ", zh: "哈希片段" },
  "url.default": { en: "(default)", ar: "(افتراضي)", es: "(predeterminado)", fr: "(par défaut)", de: "(Standard)", ja: "(デフォルト)", zh: "(默认)" },
  "url.decode_error": { en: "Invalid input for decoding", ar: "إدخال غير صالح لفك التشفير", es: "Entrada no válida para decodificar", fr: "Entrée invalide pour le décodage", de: "Ungültige Eingabe zum Dekodieren", ja: "デコード用の無効な入力です", zh: "解码输入无效" },
  // Header Builder
  "headers.add": { en: "Add header", ar: "إضافة ترويسة", es: "Añadir cabecera", fr: "Ajouter un en-tête", de: "Header hinzufügen", ja: "ヘッダーを追加", zh: "添加请求头" },
  "headers.name_placeholder": { en: "Header name", ar: "اسم الترويسة", es: "Nombre de cabecera", fr: "Nom de l'en-tête", de: "Headername", ja: "ヘッダー名", zh: "请求头名称" },
  "headers.value_placeholder": { en: "Value", ar: "القيمة", es: "Valor", fr: "Valeur", de: "Wert", ja: "値", zh: "值" },
  "headers.raw": { en: "raw", ar: "خام", es: "raw", fr: "brut", de: "roh", ja: "raw", zh: "原始" },
  // API Designer
  "api.endpoint": { en: "Endpoint", ar: "نقطة نهاية", es: "Endpoint", fr: "Endpoint", de: "Endpunkt", ja: "エンドポイント", zh: "端点" },
  "api.no_endpoints": { en: "No endpoints yet — click \"Endpoint\" to add one.", ar: "لا توجد نقاط نهاية بعد - اضغط \"نقطة نهاية\" للإضافة.", es: "Aún no hay endpoints — haz clic en \"Endpoint\" para añadir uno.", fr: "Aucun endpoint pour l'instant — cliquez sur \"Endpoint\" pour en ajouter un.", de: "Noch keine Endpunkte — auf \"Endpunkt\" klicken, um einen hinzuzufügen.", ja: "エンドポイントがまだありません。「エンドポイント」をクリックして追加してください。", zh: "暂无端点 — 点击\"端点\"添加一个。" },
  "api.description_placeholder": { en: "Description", ar: "الوصف", es: "Descripción", fr: "Description", de: "Beschreibung", ja: "説明", zh: "描述" },
  "api.copy_json": { en: "Copy as JSON", ar: "نسخ كـ JSON", es: "Copiar como JSON", fr: "Copier en JSON", de: "Als JSON kopieren", ja: "JSONとしてコピー", zh: "复制为 JSON" },
  // Project Planner
  "planner.todo": { en: "To Do", ar: "قيد الانتظار", es: "Por hacer", fr: "À faire", de: "Zu erledigen", ja: "未着手", zh: "待办" },
  "planner.doing": { en: "In Progress", ar: "قيد التنفيذ", es: "En progreso", fr: "En cours", de: "In Arbeit", ja: "進行中", zh: "进行中" },
  "planner.done": { en: "Done", ar: "منجز", es: "Hecho", fr: "Terminé", de: "Erledigt", ja: "完了", zh: "已完成" },
  "planner.add_task": { en: "Add a task…", ar: "إضافة مهمة…", es: "Añadir una tarea…", fr: "Ajouter une tâche…", de: "Aufgabe hinzufügen…", ja: "タスクを追加…", zh: "添加任务…" },
  // Folder Generator
  "folder.hint": { en: "Indent with 2 spaces. End a line with / for a folder.", ar: "استخدم مسافتين للمسافة البادئة. أنهِ السطر بـ / لجعله مجلداً.", es: "Sangra con 2 espacios. Termina una línea con / para una carpeta.", fr: "Indentez avec 2 espaces. Terminez une ligne par / pour un dossier.", de: "Mit 2 Leerzeichen einrücken. Zeile mit / beenden für einen Ordner.", ja: "2スペースでインデント。フォルダは行末に/を付けます。", zh: "使用 2 个空格缩进。以 / 结尾表示文件夹。" },
  "folder.download_zip": { en: "Download ZIP", ar: "تحميل ZIP", es: "Descargar ZIP", fr: "Télécharger ZIP", de: "ZIP herunterladen", ja: "ZIPをダウンロード", zh: "下载 ZIP" },
  // Architecture
  "arch.component": { en: "Component", ar: "مكوّن", es: "Componente", fr: "Composant", de: "Komponente", ja: "コンポーネント", zh: "组件" },
  "arch.new_component": { en: "New component", ar: "مكوّن جديد", es: "Nuevo componente", fr: "Nouveau composant", de: "Neue Komponente", ja: "新規コンポーネント", zh: "新建组件" },
  "arch.client": { en: "Client (React)", ar: "العميل (React)", es: "Cliente (React)", fr: "Client (React)", de: "Client (React)", ja: "クライアント (React)", zh: "客户端 (React)" },
  "arch.api_server": { en: "API Server", ar: "خادم API", es: "Servidor API", fr: "Serveur API", de: "API-Server", ja: "APIサーバー", zh: "API 服务器" },
  "arch.database": { en: "Database", ar: "قاعدة البيانات", es: "Base de datos", fr: "Base de données", de: "Datenbank", ja: "データベース", zh: "数据库" },
  "arch.change_icon": { en: "Click to change icon", ar: "اضغط لتغيير الأيقونة", es: "Haz clic para cambiar el icono", fr: "Cliquez pour changer l'icône", de: "Klicken, um Icon zu ändern", ja: "クリックしてアイコンを変更", zh: "点击更改图标" },
  // Documentation
  "docs.new_page": { en: "New page", ar: "صفحة جديدة", es: "Nueva página", fr: "Nouvelle page", de: "Neue Seite", ja: "新規ページ", zh: "新建页面" },
  "docs.export_all": { en: "Export all as Markdown", ar: "تصدير الكل كـ Markdown", es: "Exportar todo como Markdown", fr: "Tout exporter en Markdown", de: "Alles als Markdown exportieren", ja: "すべてMarkdownでエクスポート", zh: "全部导出为 Markdown" },
  "docs.create_hint": { en: "Create a page to get started", ar: "أنشئ صفحة للبدء", es: "Crea una página para empezar", fr: "Créez une page pour commencer", de: "Seite erstellen, um zu beginnen", ja: "ページを作成して開始", zh: "创建页面以开始" },
  "untitled": { en: "Untitled", ar: "بدون عنوان", es: "Sin título", fr: "Sans titre", de: "Unbenannt", ja: "無題", zh: "无标题" },
  // Flowcharts
  "flow.start_end": { en: "Start/End", ar: "بداية/نهاية", es: "Inicio/Fin", fr: "Début/Fin", de: "Start/Ende", ja: "開始/終了", zh: "开始/结束" },
  "flow.process": { en: "Process", ar: "عملية", es: "Proceso", fr: "Processus", de: "Prozess", ja: "処理", zh: "处理" },
  "flow.decision": { en: "Decision", ar: "قرار", es: "Decisión", fr: "Décision", de: "Entscheidung", ja: "分岐", zh: "判断" },
  "flow.terminate": { en: "Terminate", ar: "إنهاء", es: "Terminar", fr: "Terminer", de: "Beenden", ja: "終了", zh: "终止" },
  "flow.start": { en: "Start", ar: "بداية", es: "Inicio", fr: "Début", de: "Start", ja: "開始", zh: "开始" },
  "flow.end": { en: "End", ar: "نهاية", es: "Fin", fr: "Fin", de: "Ende", ja: "終了", zh: "结束" },
  "flow.receive_request": { en: "Receive request", ar: "استلام الطلب", es: "Recibir solicitud", fr: "Recevoir la requête", de: "Anfrage empfangen", ja: "リクエストを受信", zh: "接收请求" },
  "flow.valid": { en: "Valid?", ar: "صالح؟", es: "¿Válido?", fr: "Valide ?", de: "Gültig?", ja: "有効？", zh: "有效吗？" },
  "flow.return_error": { en: "Return error", ar: "إرجاع خطأ", es: "Devolver error", fr: "Retourner une erreur", de: "Fehler zurückgeben", ja: "エラーを返す", zh: "返回错误" },
  "flow.yes": { en: "yes", ar: "نعم", es: "sí", fr: "oui", de: "ja", ja: "はい", zh: "是" },
  "flow.no": { en: "no", ar: "لا", es: "no", fr: "non", de: "nein", ja: "いいえ", zh: "否" },
  // CSV
  "csv.paste_placeholder": { en: "Paste CSV…", ar: "الصق CSV…", es: "Pega CSV…", fr: "Collez du CSV…", de: "CSV einfügen…", ja: "CSVを貼り付け…", zh: "粘贴 CSV…" },
  "csv.copy_json": { en: "Copy JSON", ar: "نسخ JSON", es: "Copiar JSON", fr: "Copier JSON", de: "JSON kopieren", ja: "JSONをコピー", zh: "复制 JSON" },
  // Text Studio
  "text.upper": { en: "UPPER", ar: "كبيرة", es: "MAYÚS", fr: "MAJ", de: "GROSS", ja: "大文字", zh: "大写" },
  "text.lower": { en: "lower", ar: "صغيرة", es: "minús", fr: "min", de: "klein", ja: "小文字", zh: "小写" },
  "text.title_case": { en: "Title", ar: "بداية الكلمة", es: "Título", fr: "Titre", de: "Titel", ja: "タイトル", zh: "首字母大写" },
  // PDF
  "pdf.click_add": { en: "Click to add PDF files", ar: "اضغط لإضافة ملفات PDF", es: "Haz clic para añadir archivos PDF", fr: "Cliquez pour ajouter des fichiers PDF", de: "Klicken, um PDF-Dateien hinzuzufügen", ja: "クリックしてPDFファイルを追加", zh: "点击添加 PDF 文件" },
  "pdf.pages": { en: "pages", ar: "صفحات", es: "páginas", fr: "pages", de: "Seiten", ja: "ページ", zh: "页" },
  "pdf.hint": { en: "Add two or more PDFs to merge them, in order.", ar: "أضف ملفين أو أكثر لدمجهم بالترتيب.", es: "Añade dos o más PDFs para combinarlos en orden.", fr: "Ajoutez deux PDF ou plus pour les fusionner, dans l'ordre.", de: "Zwei oder mehr PDFs hinzufügen, um sie der Reihe nach zusammenzuführen.", ja: "2つ以上のPDFを順番に追加して結合します。", zh: "添加两个或以上的 PDF 按顺序合并。" },
  "pdf.files_count": { en: "files", ar: "ملفات", es: "archivos", fr: "fichiers", de: "Dateien", ja: "ファイル", zh: "个文件" },
  "pdf.pages_total": { en: "pages total", ar: "صفحة بالمجموع", es: "páginas en total", fr: "pages au total", de: "Seiten insgesamt", ja: "ページ合計", zh: "总页数" },
  "pdf.merging": { en: "Merging…", ar: "جاري الدمج…", es: "Combinando…", fr: "Fusion en cours…", de: "Wird zusammengeführt…", ja: "結合中…", zh: "正在合并…" },
  "pdf.merge_download": { en: "Merge & Download", ar: "دمج وتحميل", es: "Combinar y descargar", fr: "Fusionner et télécharger", de: "Zusammenführen & herunterladen", ja: "結合してダウンロード", zh: "合并并下载" },
  "pdf.move_up": { en: "Move up", ar: "تحريك لأعلى", es: "Mover arriba", fr: "Monter", de: "Nach oben", ja: "上へ移動", zh: "上移" },
  "pdf.move_down": { en: "Move down", ar: "تحريك لأسفل", es: "Mover abajo", fr: "Descendre", de: "Nach unten", ja: "下へ移動", zh: "下移" },
  // QR
  "qr.content": { en: "Content", ar: "المحتوى", es: "Contenido", fr: "Contenu", de: "Inhalt", ja: "内容", zh: "内容" },
  "qr.foreground": { en: "Foreground", ar: "اللون الأمامي", es: "Primer plano", fr: "Premier plan", de: "Vordergrund", ja: "前景色", zh: "前景色" },
  "qr.background": { en: "Background", ar: "الخلفية", es: "Fondo", fr: "Arrière-plan", de: "Hintergrund", ja: "背景色", zh: "背景色" },
  "qr.download_png": { en: "Download PNG", ar: "تحميل PNG", es: "Descargar PNG", fr: "Télécharger PNG", de: "PNG herunterladen", ja: "PNGをダウンロード", zh: "下载 PNG" },
  // Password
  "password.strength.0": { en: "Very weak", ar: "ضعيفة جداً", es: "Muy débil", fr: "Très faible", de: "Sehr schwach", ja: "非常に弱い", zh: "非常弱" },
  "password.strength.1": { en: "Weak", ar: "ضعيفة", es: "Débil", fr: "Faible", de: "Schwach", ja: "弱い", zh: "弱" },
  "password.strength.2": { en: "Fair", ar: "متوسطة", es: "Aceptable", fr: "Correct", de: "Mittel", ja: "普通", zh: "一般" },
  "password.strength.3": { en: "Good", ar: "جيدة", es: "Buena", fr: "Bon", de: "Gut", ja: "良い", zh: "良好" },
  "password.strength.4": { en: "Strong", ar: "قوية", es: "Fuerte", fr: "Fort", de: "Stark", ja: "強い", zh: "强" },
  "password.strength.5": { en: "Excellent", ar: "ممتازة", es: "Excelente", fr: "Excellent", de: "Ausgezeichnet", ja: "非常に強い", zh: "极强" },
  "password.generate_new": { en: "Generate new", ar: "توليد جديدة", es: "Generar nueva", fr: "Générer nouveau", de: "Neu generieren", ja: "新しく生成", zh: "生成新密码" },
  "password.set.lower": { en: "lower", ar: "أحرف صغيرة", es: "minúsculas", fr: "minuscules", de: "Kleinbuchstaben", ja: "小文字", zh: "小写字母" },
  "password.set.upper": { en: "upper", ar: "أحرف كبيرة", es: "mayúsculas", fr: "majuscules", de: "Großbuchstaben", ja: "大文字", zh: "大写字母" },
  "password.set.digits": { en: "digits", ar: "أرقام", es: "dígitos", fr: "chiffres", de: "Ziffern", ja: "数字", zh: "数字" },
  "password.set.symbols": { en: "symbols", ar: "رموز", es: "símbolos", fr: "symboles", de: "Symbole", ja: "記号", zh: "符号" },
  // Timestamp
  "timestamp.current": { en: "Current Unix time", ar: "الوقت الحالي (Unix)", es: "Hora Unix actual", fr: "Heure Unix actuelle", de: "Aktuelle Unix-Zeit", ja: "現在のUnix時間", zh: "当前 Unix 时间" },
  "timestamp.unix_label": { en: "Unix timestamp (seconds)", ar: "الطابع الزمني (ثوانٍ)", es: "Marca Unix (segundos)", fr: "Horodatage Unix (secondes)", de: "Unix-Zeitstempel (Sekunden)", ja: "Unixタイムスタンプ(秒)", zh: "Unix 时间戳(秒)" },
  "timestamp.iso": { en: "ISO 8601", ar: "ISO 8601", es: "ISO 8601", fr: "ISO 8601", de: "ISO 8601", ja: "ISO 8601", zh: "ISO 8601" },
  "timestamp.local": { en: "Local", ar: "محلي", es: "Local", fr: "Local", de: "Lokal", ja: "ローカル", zh: "本地时间" },
  "timestamp.utc": { en: "UTC", ar: "UTC", es: "UTC", fr: "UTC", de: "UTC", ja: "UTC", zh: "UTC" },
  "timestamp.relative": { en: "Relative", ar: "نسبي", es: "Relativo", fr: "Relatif", de: "Relativ", ja: "相対時間", zh: "相对时间" },
  "timestamp.day_of_year": { en: "Day of year", ar: "يوم السنة", es: "Día del año", fr: "Jour de l'année", de: "Tag des Jahres", ja: "年間通算日", zh: "年内第几天" },
  "timestamp.ago": { en: "ago", ar: "قبل", es: "atrás", fr: "il y a", de: "her", ja: "前", zh: "前" },
  "timestamp.from_now": { en: "from now", ar: "من الآن", es: "desde ahora", fr: "à partir de maintenant", de: "ab jetzt", ja: "後", zh: "后" },
  "timestamp.now": { en: "now", ar: "الآن", es: "ahora", fr: "maintenant", de: "jetzt", ja: "たった今", zh: "刚刚" },
  "timestamp.unit.year": { en: "year", ar: "سنة", es: "año", fr: "an", de: "Jahr", ja: "年", zh: "年" },
  "timestamp.unit.years": { en: "years", ar: "سنوات", es: "años", fr: "ans", de: "Jahre", ja: "年", zh: "年" },
  "timestamp.unit.month": { en: "month", ar: "شهر", es: "mes", fr: "mois", de: "Monat", ja: "ヶ月", zh: "个月" },
  "timestamp.unit.months": { en: "months", ar: "أشهر", es: "meses", fr: "mois", de: "Monate", ja: "ヶ月", zh: "个月" },
  "timestamp.unit.day": { en: "day", ar: "يوم", es: "día", fr: "jour", de: "Tag", ja: "日", zh: "天" },
  "timestamp.unit.days": { en: "days", ar: "أيام", es: "días", fr: "jours", de: "Tage", ja: "日", zh: "天" },
  "timestamp.unit.hour": { en: "hour", ar: "ساعة", es: "hora", fr: "heure", de: "Stunde", ja: "時間", zh: "小时" },
  "timestamp.unit.hours": { en: "hours", ar: "ساعات", es: "horas", fr: "heures", de: "Stunden", ja: "時間", zh: "小时" },
  "timestamp.unit.minute": { en: "minute", ar: "دقيقة", es: "minuto", fr: "minute", de: "Minute", ja: "分", zh: "分钟" },
  "timestamp.unit.minutes": { en: "minutes", ar: "دقائق", es: "minutos", fr: "minutes", de: "Minuten", ja: "分", zh: "分钟" },
  "timestamp.unit.second": { en: "second", ar: "ثانية", es: "segundo", fr: "seconde", de: "Sekunde", ja: "秒", zh: "秒" },
  "timestamp.unit.seconds": { en: "seconds", ar: "ثوانٍ", es: "segundos", fr: "secondes", de: "Sekunden", ja: "秒", zh: "秒" },
  // Diff
  "diff.original": { en: "Original", ar: "الأصلي", es: "Original", fr: "Original", de: "Original", ja: "元のテキスト", zh: "原文" },
  "diff.changed": { en: "Changed", ar: "المعدّل", es: "Modificado", fr: "Modifié", de: "Geändert", ja: "変更後", zh: "修改后" },
  "diff.added": { en: "added", ar: "إضافة", es: "añadido", fr: "ajouté", de: "hinzugefügt", ja: "追加", zh: "已添加" },
  "diff.removed": { en: "removed", ar: "إزالة", es: "eliminado", fr: "supprimé", de: "entfernt", ja: "削除", zh: "已删除" },
  "diff.mode_lines": { en: "lines", ar: "أسطر", es: "líneas", fr: "lignes", de: "Zeilen", ja: "行単位", zh: "按行" },
  "diff.mode_words": { en: "words", ar: "كلمات", es: "palabras", fr: "mots", de: "Wörter", ja: "単語単位", zh: "按词" },
  // Clipboard
  "clipboard.placeholder": { en: "Type or paste something to save…", ar: "اكتب أو الصق شي لحفظه…", es: "Escribe o pega algo para guardar…", fr: "Tapez ou collez quelque chose à enregistrer…", de: "Etwas eingeben oder einfügen zum Speichern…", ja: "保存する内容を入力または貼り付け…", zh: "输入或粘贴要保存的内容…" },
  "clipboard.empty": { en: "No saved snippets yet — add one above.", ar: "لا توجد مقتطفات محفوظة بعد - أضف واحدة بالأعلى.", es: "Aún no hay fragmentos guardados — añade uno arriba.", fr: "Aucun extrait enregistré — ajoutez-en un ci-dessus.", de: "Noch keine gespeicherten Snippets — oben eines hinzufügen.", ja: "保存されたスニペットはまだありません。上で追加してください。", zh: "暂无保存的片段 — 请在上方添加。" },
  "clipboard.paste_from_system": { en: "Paste from clipboard", ar: "لصق من الحافظة", es: "Pegar desde el portapapeles", fr: "Coller depuis le presse-papiers", de: "Aus Zwischenablage einfügen", ja: "クリップボードから貼り付け", zh: "从剪贴板粘贴" },
  // Notes
  "notes.placeholder": { en: "Start writing…", ar: "ابدأ الكتابة…", es: "Empieza a escribir…", fr: "Commencez à écrire…", de: "Los schreiben…", ja: "書き始める…", zh: "开始输入…" },
  "notes.new": { en: "New note", ar: "ملاحظة جديدة", es: "Nueva nota", fr: "Nouvelle note", de: "Neue Notiz", ja: "新規メモ", zh: "新建笔记" },
  "notes.select_hint": { en: "Select or create a note", ar: "اختر أو أنشئ ملاحظة", es: "Selecciona o crea una nota", fr: "Sélectionnez ou créez une note", de: "Notiz auswählen oder erstellen", ja: "メモを選択または作成", zh: "选择或创建笔记" },
  "notes.empty_list": { en: "No notes yet", ar: "لا توجد ملاحظات بعد", es: "Aún no hay notas", fr: "Aucune note pour l'instant", de: "Noch keine Notizen", ja: "まだメモがありません", zh: "暂无笔记" },
  "notes.untitled": { en: "Untitled note", ar: "ملاحظة بدون عنوان", es: "Nota sin título", fr: "Note sans titre", de: "Unbenannte Notiz", ja: "無題のメモ", zh: "无标题笔记" },
  // Snippets
  "snippets.new": { en: "New snippet", ar: "مقتطف جديد", es: "Nuevo fragmento", fr: "Nouvel extrait", de: "Neues Snippet", ja: "新規スニペット", zh: "新建片段" },
  "snippets.select_hint": { en: "Select or create a snippet", ar: "اختر أو أنشئ مقتطف", es: "Selecciona o crea un fragmento", fr: "Sélectionnez ou créez un extrait", de: "Snippet auswählen oder erstellen", ja: "スニペットを選択または作成", zh: "选择或创建代码片段" },
  "snippets.empty_list": { en: "No snippets yet", ar: "لا توجد مقتطفات بعد", es: "Aún no hay fragmentos", fr: "Aucun extrait pour l'instant", de: "Noch keine Snippets", ja: "まだスニペットがありません", zh: "暂无代码片段" },
  // History
  "history.empty": { en: "Nothing opened yet — your activity will show up here.", ar: "لم يُفتح شي بعد - نشاطك بيظهر هنا.", es: "Nada abierto todavía — tu actividad aparecerá aquí.", fr: "Rien d'ouvert pour l'instant — votre activité apparaîtra ici.", de: "Noch nichts geöffnet — deine Aktivität erscheint hier.", ja: "まだ何も開いていません。ここに活動が表示されます。", zh: "尚未打开任何内容 — 你的活动将显示在这里。" },
  "history.today": { en: "Today", ar: "اليوم", es: "Hoy", fr: "Aujourd'hui", de: "Heute", ja: "今日", zh: "今天" },
  "history.yesterday": { en: "Yesterday", ar: "أمس", es: "Ayer", fr: "Hier", de: "Gestern", ja: "昨日", zh: "昨天" },
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
