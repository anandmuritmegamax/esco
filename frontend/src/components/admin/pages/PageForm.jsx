import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useCreatePageMutation,
  useUpdatePageMutation,
} from "../../../redux/api/pagesApi";

const PageForm = ({ page, onSaved }) => {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    status: "draft",
    metaTitle: "",
    metaDescription: "",
    keywords: "", // ✅ NEW
  });

  const [createPage, { isLoading: creating }] = useCreatePageMutation();
  const [updatePage, { isLoading: updating }] = useUpdatePageMutation();

  /* ================= LOAD EDIT DATA ================= */
  useEffect(() => {
    if (page) {
      setForm({
        title: page.title,
        slug: page.slug,
        content: page.content,
        status: page.status,
        metaTitle: page.seo?.metaTitle || "",
        metaDescription: page.seo?.metaDescription || "",
        keywords: page.seo?.keywords?.join(", ") || "", // ✅ NEW
      });
    }
  }, [page]);

  const autoSlug = (value) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: form.title,
        slug: form.slug || autoSlug(form.title),
        content: form.content,
        status: form.status,
        seo: {
          metaTitle: form.metaTitle,
          metaDescription: form.metaDescription,
          keywords: form.keywords
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean), // ✅ NEW
        },
      };

      if (page?._id) {
        await updatePage({ id: page._id, data: payload }).unwrap();
      } else {
        await createPage(payload).unwrap();
      }

      toast.success(`Page ${page ? "updated" : "created"} successfully`);
      onSaved();
    } catch {
      toast.error("Save failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 bg-light mb-4">
      <div className="row g-3">
        {/* TITLE */}
        <div className="col-md-6">
          <label>Page Title *</label>
          <input
            required
            className="form-control"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
                slug: autoSlug(e.target.value),
              })
            }
          />
        </div>

        {/* SLUG */}
        <div className="col-md-6">
          <label>Slug *</label>
          <input
            required
            className="form-control"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />
        </div>

        {/* CONTENT */}
        <div className="col-md-12">
          <label>Content *</label>
          <textarea
            required
            rows="6"
            className="form-control"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="HTML / Rich content"
          />
        </div>

        {/* STATUS */}
        <div className="col-md-4">
          <label>Status</label>
          <select
            className="form-control"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* META TITLE */}
        <div className="col-md-4">
          <label>Meta Title</label>
          <input
            className="form-control"
            value={form.metaTitle}
            onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
          />
        </div>

        {/* META DESCRIPTION */}
        <div className="col-md-4">
          <label>Meta Description</label>
          <input
            className="form-control"
            value={form.metaDescription}
            onChange={(e) =>
              setForm({ ...form, metaDescription: e.target.value })
            }
          />
        </div>

        {/* ✅ SEO KEYWORDS */}
        <div className="col-md-12">
          <label>SEO Keywords</label>
          <input
            className="form-control"
            placeholder="keyword1, keyword2, keyword3"
            value={form.keywords}
            onChange={(e) => setForm({ ...form, keywords: e.target.value })}
          />
          <small className="text-muted">Enter comma separated keywords</small>
        </div>

        {/* ACTIONS */}
        <div className="col-md-12 mt-3">
          <button className="btn btn-success" disabled={creating || updating}>
            {creating || updating
              ? "Processing..."
              : page
                ? "Update Page"
                : "Create Page"}
          </button>

          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={onSaved}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default PageForm;
