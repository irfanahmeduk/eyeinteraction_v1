"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import {
  Alert,
  Button,
  Collapse,
  ColorPicker,
  Empty,
  Input,
  InputNumber,
  Popconfirm,
  Segmented,
  Skeleton,
  Space,
  Switch,
  Tooltip,
} from "antd";
import {
  AppstoreOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  BgColorsOutlined,
  BorderBottomOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileProtectOutlined,
  HomeOutlined,
  MenuOutlined,
  PictureOutlined,
  PlusOutlined,
  SendOutlined,
  TrophyOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { PageHeader } from "../../components/shell/PageHeader.jsx";
import { MotionSurface } from "../../lib/motion/index.jsx";
import { useFeedback } from "../../components/feedback/index.jsx";
import { websiteApi } from "../../lib/websiteApi.js";
import { PreviewShell } from "../../components/cms/PreviewShell.jsx";
import { LegalEditor } from "../../components/cms/LegalEditor.jsx";
import { StoriesEditor } from "../../components/cms/StoriesEditor.jsx";
import { RichTextEditor } from "../../components/cms/RichTextEditor.jsx";
import "./website-manager.css";

/* ---------- Navigation config -------------------------------------------- */

const NAV = [
  {
    group: "Pages",
    items: [
      { key: "home", label: "Home page", hint: "Sections and copy", icon: <HomeOutlined />, desc: "Choose which sections appear on the homepage, set their order, and edit what each one says." },
      { key: "stories", label: "Success stories", hint: "Customer proof", icon: <TrophyOutlined />, desc: "Add and edit the stories shown on the website." },
      { key: "legal", label: "Legal pages", hint: "Terms and privacy", icon: <FileProtectOutlined />, desc: "Edit your policies and legal pages." },
    ],
  },
  {
    group: "Site frame",
    items: [
      { key: "navigation", label: "Navigation", hint: "Header menu", icon: <MenuOutlined />, desc: "Links and buttons in the header bar." },
      { key: "footer", label: "Footer", hint: "Links and contact", icon: <BorderBottomOutlined />, desc: "Footer columns, links and text shown on every page." },
      { key: "pages", label: "Page headers", hint: "Banners", icon: <PictureOutlined />, desc: "Titles and banners at the top of each sub-page." },
    ],
  },
  {
    group: "Brand",
    items: [
      { key: "appearance", label: "Appearance", hint: "Colours and spacing", icon: <BgColorsOutlined />, desc: "Theme colours and spacing for the public website." },
    ],
  },
];

const PANEL = Object.fromEntries(NAV.flatMap(g => g.items).map(i => [i.key, i]));

/* ---------- Field helpers ------------------------------------------------- */

const labels = {
  headingPrefix: "Heading first line",
  headingHighlight: "Highlighted heading",
  headingSuffix: "Heading last line",
  updatedAt: "Last updated",
  primaryButton: "Primary button",
  secondaryButton: "Secondary button",
  successStories: "Success Stories",
  primaryColor: "Primary colour",
  secondaryColor: "Secondary colour",
  accentColor: "Accent colour",
  sectionSpacing: "Section spacing",
  href: "Link URL",
  seo: "Search engine details",
};

const humanize = key => labels[key] || key.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase());

const isRich = name => name === "content" || name === "body";
const isLong = (name, v) =>
  v.length > 90 || ["description", "quote", "answer", "summary", "intro", "subtitle"].includes(name);

function blankFrom(value) {
  if (typeof value === "string") return "";
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  if (Array.isArray(value)) return [];
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, blankFrom(v)]));
  }
  return "";
}

function Field({ label, hint, wide, inline, as: As = "label", children }) {
  const cls = ["wm-field", wide && "is-wide", inline && "is-inline"].filter(Boolean).join(" ");
  return (
    <As className={cls}>
      <span className="wm-label">{label}</span>
      {children}
      {hint && <span className="wm-hint">{hint}</span>}
    </As>
  );
}

// Single-line vs multi-line is decided once on mount, so a field never
// changes shape (or loses focus) while you're typing in it.
function TextField({ name, value, onChange }) {
  const [long] = useState(() => isLong(name, value));
  return (
    <Field label={humanize(name)} wide={long}>
      {long ? (
        <Input.TextArea autoSize={{ minRows: 3, maxRows: 12 }} value={value} onChange={e => onChange(e.target.value)} />
      ) : (
        <Input value={value} onChange={e => onChange(e.target.value)} />
      )}
    </Field>
  );
}

// Keeps its own draft text so pressing Enter actually creates a new line
// (filtering blanks on every keystroke used to swallow the newline).
function LinesField({ value, onChange }) {
  const [text, setText] = useState(() => value.join("\n"));
  useEffect(() => {
    setText(cur => (cur.split("\n").filter(Boolean).join("\n") === value.join("\n") ? cur : value.join("\n")));
  }, [value]);
  return (
    <Input.TextArea
      value={text}
      autoSize={{ minRows: 3, maxRows: 10 }}
      onChange={e => {
        setText(e.target.value);
        onChange(e.target.value.split("\n").filter(Boolean));
      }}
    />
  );
}

function ListField({ name, value, onChange, depth }) {
  const swap = (a, b) => {
    const next = [...value];
    [next[a], next[b]] = [next[b], next[a]];
    onChange(next);
  };
  const add = () => onChange([...value, blankFrom(value[0] || { label: "", href: "" })]);

  return (
    <div className="wm-field is-wide">
      <div className="wm-list-head">
        <span className="wm-label">{humanize(name)}</span>
        <span className="wm-count">{value.length} {value.length === 1 ? "item" : "items"}</span>
      </div>

      {value.length ? (
        <Collapse
          className="wm-collapse"
          bordered={false}
          expandIconPosition="start"
          items={value.map((item, index) => ({
            key: String(index),
            label: item?.title || item?.label || item?.question || item?.name || `Item ${index + 1}`,
            extra: (
              <span className="wm-item-actions" onClick={e => e.stopPropagation()}>
                <Tooltip title="Move up">
                  <Button size="small" type="text" aria-label="Move up" disabled={!index} icon={<ArrowUpOutlined />} onClick={() => swap(index - 1, index)} />
                </Tooltip>
                <Tooltip title="Move down">
                  <Button size="small" type="text" aria-label="Move down" disabled={index === value.length - 1} icon={<ArrowDownOutlined />} onClick={() => swap(index, index + 1)} />
                </Tooltip>
                <Popconfirm title="Remove this item?" onConfirm={() => onChange(value.filter((_, i) => i !== index))}>
                  <Button size="small" danger type="text" aria-label="Remove item" icon={<DeleteOutlined />} />
                </Popconfirm>
              </span>
            ),
            children: (
              <FieldEditor
                name="details"
                value={item}
                depth={depth + 1}
                onChange={next => onChange(value.map((cur, i) => (i === index ? next : cur)))}
              />
            ),
          }))}
        />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Nothing here yet" />
      )}

      <Button type="dashed" block icon={<PlusOutlined />} onClick={add}>
        Add item
      </Button>
    </div>
  );
}

function FieldEditor({ name, value, onChange, depth = 0 }) {
  const label = humanize(name);

  if (typeof value === "boolean") {
    return (
      <Field label={label} inline>
        <Switch checked={value} onChange={onChange} />
      </Field>
    );
  }

  if (typeof value === "number") {
    return (
      <Field label={label}>
        <InputNumber min={0} value={value} onChange={next => onChange(next ?? 0)} />
      </Field>
    );
  }

  if (typeof value === "string") {
    if (name.toLowerCase().includes("color")) {
      return (
        <Field label={label}>
          <ColorPicker value={value} showText onChange={next => onChange(next.toHexString())} />
        </Field>
      );
    }
    if (isRich(name)) {
      return (
        <Field label={label} as="div" wide>
          <RichTextEditor value={value} onChange={onChange} minHeight={180} />
        </Field>
      );
    }
    return <TextField name={name} value={value} onChange={onChange} />;
  }

  if (Array.isArray(value)) {
    if (value.every(item => typeof item === "string")) {
      return (
        <Field label={label} wide hint="One item per line">
          <LinesField value={value} onChange={onChange} />
        </Field>
      );
    }
    return <ListField name={name} value={value} onChange={onChange} depth={depth} />;
  }

  if (value && typeof value === "object") {
    const fields = (
      <div className="wm-fields">
        {Object.entries(value).map(([key, child]) => (
          <FieldEditor
            key={key}
            name={key}
            value={child}
            depth={depth + 1}
            onChange={next => onChange({ ...value, [key]: next })}
          />
        ))}
      </div>
    );
    if (depth === 0 || name === "details") return fields;
    return (
      <section className="wm-group is-wide">
        <h4 className="wm-group-title">{label}</h4>
        {fields}
      </section>
    );
  }

  return null;
}

/* ---------- Home: section rail + editor ----------------------------------- */

function HomeEditor({ home, onChange }) {
  const [selected, setSelected] = useState(home.sections[0]?.id);
  const selectedIndex = Math.max(0, home.sections.findIndex(s => s.id === selected));
  const section = home.sections[selectedIndex];

  const updateSections = sections => onChange({ ...home, sections });

  const move = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= home.sections.length) return;
    const sections = [...home.sections];
    [sections[index], sections[target]] = [sections[target], sections[index]];
    updateSections(sections);
  };

  const toggle = (index, enabled) =>
    updateSections(home.sections.map((s, i) => (i === index ? { ...s, enabled } : s)));

  return (
    <div className="wm-home">
      <aside className="wm-card wm-rail" aria-label="Homepage sections">
        <div className="wm-rail-head">
          <span>Sections</span>
          <span className="wm-count">
            {home.sections.filter(s => s.enabled).length} of {home.sections.length} visible
          </span>
        </div>

        {home.sections.map((item, index) => (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            aria-current={item.id === section?.id ? "true" : undefined}
            className={`wm-row${item.id === section?.id ? " is-selected" : ""}${item.enabled ? "" : " is-off"}`}
            onClick={() => setSelected(item.id)}
            onKeyDown={e => {
              if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                setSelected(item.id);
              }
            }}
          >
            <span className="wm-row-index">{index + 1}</span>
            <span className="wm-row-text">
              <strong>{item.name}</strong>
              <small>{humanize(item.type)}</small>
            </span>
            <span className="wm-row-actions" onClick={e => e.stopPropagation()}>
              <span className="wm-row-move">
                <Button size="small" type="text" aria-label={`Move ${item.name} up`} disabled={!index} icon={<ArrowUpOutlined />} onClick={() => move(index, -1)} />
                <Button size="small" type="text" aria-label={`Move ${item.name} down`} disabled={index === home.sections.length - 1} icon={<ArrowDownOutlined />} onClick={() => move(index, 1)} />
              </span>
              <Tooltip title={item.enabled ? "Visible on site" : "Hidden"}>
                <Switch size="small" aria-label={`Show ${item.name}`} checked={item.enabled} onChange={enabled => toggle(index, enabled)} />
              </Tooltip>
            </span>
          </div>
        ))}
      </aside>

      <div className="wm-card">
        {section ? (
          <>
            <div className="wm-editor-head">
              <span className="wm-editor-icon"><AppstoreOutlined /></span>
              <span className="wm-editor-title">
                <strong>{section.name}</strong>
                <small>{humanize(section.type)}</small>
              </span>
              <span className="wm-editor-vis">
                {section.enabled ? "Visible on site" : "Hidden"}
                <Switch checked={section.enabled} onChange={enabled => toggle(selectedIndex, enabled)} />
              </span>
            </div>
            <FieldEditor
              name="content"
              value={section.content}
              onChange={content =>
                updateSections(home.sections.map((item, index) => (index === selectedIndex ? { ...item, content } : item)))
              }
            />
          </>
        ) : (
          <Empty description="Select a section from the list" />
        )}
      </div>
    </div>
  );
}

function CmsSkeleton() {
  return (
    <div className="wm-shell">
      <div className="wm-nav">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Skeleton.Button key={i} active block style={{ height: 48, borderRadius: 8 }} />
        ))}
      </div>
      <div className="wm-main">
        <Skeleton active title={{ width: 200 }} paragraph={{ rows: 1 }} />
        <div className="wm-card">
          <div className="wm-fields">
            <Skeleton.Input active block style={{ height: 40 }} />
            <Skeleton.Input active block style={{ height: 40 }} />
            <div className="is-wide"><Skeleton.Button active block style={{ height: 120 }} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Page ----------------------------------------------------------- */

export default function WebsiteManager({ initialTab = "home" }) {
  const feedback = useFeedback();
  const [content, setContent] = useState(null);
  const [initialSnapshot, setInitialSnapshot] = useState(null);
  const [meta, setMeta] = useState({});
  const [busy, setBusy] = useState(false); // false | "draft" | "publish"
  const [error, setError] = useState("");
  const [mode, setMode] = useState("edit");
  const [activeTab, setActiveTab] = useState(initialTab);
  // Panels mount on first visit and then stay mounted (just hidden), so
  // switching back is instant and nothing loses its state.
  const [visited, setVisited] = useState(() => new Set([initialTab]));
  const [isTabPending, startTabTransition] = useTransition();

  useEffect(() => {
    websiteApi
      .query()
      .then(data => {
        setContent(data.content);
        setInitialSnapshot(JSON.stringify(data.content));
        setMeta(data);
      })
      .catch(err => setError(err.message));
  }, []);

  const isDirty = useMemo(() => {
    if (!initialSnapshot || !content) return false;
    return JSON.stringify(content) !== initialSnapshot;
  }, [initialSnapshot, content]);

  const save = async publish => {
    setBusy(publish ? "publish" : "draft");
    setError("");
    try {
      const data = await websiteApi.save(content, publish);
      setContent(data.content);
      setInitialSnapshot(JSON.stringify(data.content));
      setMeta(current => ({
        ...current,
        published: publish || current.published,
        publishedAt: publish ? new Date().toISOString() : current.publishedAt,
      }));
      feedback.success(publish ? "Website published successfully" : "Draft saved");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  // Ctrl/Cmd + S saves the draft
  useEffect(() => {
    const onKey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (isDirty && !busy) save(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isDirty, busy, content]); // eslint-disable-line react-hooks/exhaustive-deps

  const discardEdits = () => {
    if (!initialSnapshot) return;
    try {
      setContent(JSON.parse(initialSnapshot));
      feedback.info("Edits reset to saved draft");
    } catch {
      /* ignore parse error */
    }
  };

  const handleTabChange = key => {
    startTabTransition(() => {
      setActiveTab(key);
      setVisited(prev => new Set(prev).add(key));
    });
  };

  // Each editor depends only on its own slice of `content`.
  const homeChildren = useMemo(
    () => (content ? <HomeEditor home={content.home} onChange={home => setContent(prev => ({ ...prev, home }))} /> : null),
    [content?.home]
  );
  const storiesChildren = useMemo(
    () => (content ? <StoriesEditor stories={content.stories || []} onChange={stories => setContent(prev => ({ ...prev, stories }))} /> : null),
    [content?.stories]
  );
  const legalChildren = useMemo(
    () => (content ? <LegalEditor legal={content.legal || {}} onChange={legal => setContent(prev => ({ ...prev, legal }))} /> : null),
    [content?.legal]
  );
  const navigationChildren = useMemo(
    () =>
      content ? (
        <div className="wm-card">
          <FieldEditor name="navigation" value={content.navigation} onChange={navigation => setContent(prev => ({ ...prev, navigation }))} />
        </div>
      ) : null,
    [content?.navigation]
  );
  const footerChildren = useMemo(
    () =>
      content ? (
        <div className="wm-card">
          <Alert type="info" showIcon message="Column headings stay fixed; all list items and text are editable." />
          <FieldEditor name="footer" value={content.footer} onChange={footer => setContent(prev => ({ ...prev, footer }))} />
        </div>
      ) : null,
    [content?.footer]
  );
  const pagesChildren = useMemo(
    () =>
      content ? (
        <div className="wm-card">
          <FieldEditor name="pages" value={content.pages} onChange={pages => setContent(prev => ({ ...prev, pages }))} />
        </div>
      ) : null,
    [content?.pages]
  );
  const appearanceChildren = useMemo(
    () =>
      content ? (
        <div className="wm-card">
          <Alert type="warning" showIcon message="Brand colours apply to the public website after publishing or previewing." />
          <FieldEditor name="appearance" value={content.appearance} onChange={appearance => setContent(prev => ({ ...prev, appearance }))} />
        </div>
      ) : null,
    [content?.appearance]
  );

  const panels = useMemo(
    () => ({
      home: homeChildren,
      stories: storiesChildren,
      legal: legalChildren,
      navigation: navigationChildren,
      footer: footerChildren,
      pages: pagesChildren,
      appearance: appearanceChildren,
    }),
    [homeChildren, storiesChildren, legalChildren, navigationChildren, footerChildren, pagesChildren, appearanceChildren]
  );

  const current = PANEL[activeTab] || PANEL.home;

  return (
    <MotionSurface page>
      <PageHeader
        title="Website Manager"
        group="Website"
        description="Edit page content, success stories, legal policies, and theme. Preview live before you publish."
        action={
          <Space wrap size={8}>
            <Button icon={<EyeOutlined />} href="/" target="_blank" rel="noreferrer">
              Open website
            </Button>
            <Popconfirm
              title="Publish website changes?"
              description="Visitors will see the new content immediately."
              onConfirm={() => save(true)}
            >
              <Button type="primary" icon={<SendOutlined />} loading={busy === "publish"} disabled={busy === "draft"}>
                Publish
              </Button>
            </Popconfirm>
          </Space>
        }
      />

      <div className="wm">
        <div className="wm-toolbar">
          <div className="wm-status">
            <span className={`wm-pill ${meta.published ? "is-live" : "is-draft"}`}>
              <i />
              {meta.published ? "Published" : "Not published yet"}
            </span>
            {isDirty && (
              <span className="wm-pill is-dirty">
                <i />
                Unsaved edits
              </span>
            )}
            {meta.publishedAt && (
              <span className="wm-muted">Last published {new Date(meta.publishedAt).toLocaleString()}</span>
            )}
          </div>

          <Segmented
            value={mode}
            onChange={setMode}
            options={[
              { label: <span className="wm-seg"><EditOutlined />Edit</span>, value: "edit" },
              { label: <span className="wm-seg"><EyeOutlined />Live preview</span>, value: "preview" },
            ]}
          />
        </div>

        {error && <Alert type="error" showIcon closable message={error} onClose={() => setError("")} />}

        {!content ? (
          <CmsSkeleton />
        ) : mode === "preview" ? (
          <PreviewShell content={content} activeTab={activeTab} />
        ) : (
          <div className="wm-shell">
            <nav className="wm-nav" aria-label="Website sections">
              {NAV.map(({ group, items }) => (
                <div className="wm-nav-group" key={group}>
                  <div className="wm-nav-title">{group}</div>
                  {items.map(item => (
                    <button
                      key={item.key}
                      type="button"
                      className={`wm-nav-item${item.key === activeTab ? " is-active" : ""}`}
                      aria-current={item.key === activeTab ? "page" : undefined}
                      onClick={() => handleTabChange(item.key)}
                    >
                      <span className="wm-nav-icon">{item.icon}</span>
                      <span className="wm-nav-text">
                        <strong>{item.label}</strong>
                        <small>{item.hint}</small>
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </nav>

            <main className="wm-main" data-pending={isTabPending}>
              <header className="wm-panel-head">
                <h2>{current.label}</h2>
                <p>{current.desc}</p>
              </header>

              {Object.entries(panels).map(
                ([key, children]) =>
                  visited.has(key) && (
                    <section key={key} className="wm-panel" hidden={key !== activeTab}>
                      {children}
                    </section>
                  )
              )}
            </main>
          </div>
        )}

        <div className="wm-dock" role="status" aria-live="polite" data-visible={isDirty && mode === "edit"}>
          <span className="wm-dock-dot" />
          <span>You have unsaved changes</span>
          <Popconfirm
            title="Discard unsaved changes?"
            description="This will restore fields to your last saved draft."
            onConfirm={discardEdits}
          >
            <Button type="text" icon={<UndoOutlined />} disabled={!!busy}>
              Discard
            </Button>
          </Popconfirm>
          <Button loading={busy === "draft"} disabled={busy === "publish"} onClick={() => save(false)}>
            Save draft <span className="wm-kbd">Ctrl S</span>
          </Button>
        </div>
      </div>
    </MotionSurface>
  );
}