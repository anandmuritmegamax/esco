import Page from "../models/Page.js";

/* ===============================
   ADMIN CONTROLLERS
================================ */

// CREATE PAGE
export const createPage = async (req, res) => {
    try {
        const { title, slug, content, status, seo } = req.body;

        const exists = await Page.findOne({ slug });
        if (exists) {
            return res.status(400).json({ message: "Slug already exists" });
        }

        const page = await Page.create({
            title,
            slug,
            content,
            status,
            seo,
            createdBy: req.user._id,
            publishedAt: status === "published" ? new Date() : null,
        });

        res.status(201).json({
            success: true,
            page,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET ALL PAGES (ADMIN)
export const getPages = async (req, res) => {
    try {
        const pages = await Page.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            pages,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET PAGE BY ID
export const getPageById = async (req, res) => {
    try {
        const page = await Page.findById(req.params.id);

        if (!page) {
            return res.status(404).json({ message: "Page not found" });
        }

        res.json({
            success: true,
            page,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE PAGE
export const updatePage = async (req, res) => {
    try {
        const page = await Page.findById(req.params.id);

        if (!page) {
            return res.status(404).json({ message: "Page not found" });
        }

        const { title, slug, content, status, seo } = req.body;

        // check slug conflict
        if (slug !== page.slug) {
            const exists = await Page.findOne({ slug });
            if (exists) {
                return res.status(400).json({ message: "Slug already exists" });
            }
        }

        page.title = title;
        page.slug = slug;
        page.content = content;
        page.status = status;
        page.seo = seo;

        if (status === "published" && !page.publishedAt) {
            page.publishedAt = new Date();
        }

        await page.save();

        res.json({
            success: true,
            page,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE PAGE
export const deletePage = async (req, res) => {
    try {
        const page = await Page.findById(req.params.id);

        if (!page) {
            return res.status(404).json({ message: "Page not found" });
        }

        await page.deleteOne();

        res.json({
            success: true,
            message: "Page deleted",
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* ===============================
   PUBLIC CONTROLLERS
================================ */

// GET PAGE BY SLUG (PUBLIC)
export const getPageBySlug = async (req, res) => {
    try {
        const page = await Page.findOne({
            slug: req.params.slug,
            status: "published",
        });

        if (!page) {
            return res.status(404).json({ message: "Page not found" });
        }

        res.json({
            success: true,
            page,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET ALL PUBLISHED PAGES (PUBLIC MENU)
export const getPublishedPages = async (req, res) => {
    const pages = await Page.find({ status: "published" })
        .select("title slug")
        .sort({ createdAt: 1 });

    res.json({ success: true, pages });
};

