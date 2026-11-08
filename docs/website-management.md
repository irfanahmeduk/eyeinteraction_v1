# Website management

The public website is managed from `/admin/website/manage`. The Website and
Operations selector in the admin sidebar keeps public-site content separate from
future operational modules.

## Content workflow

- Website content is loaded from the `website_content` MySQL table.
- **Save draft** stores changes without affecting visitors.
- **Publish** copies the current draft to the published version. Public pages read
  only the published version.
- Each save creates a row in `website_content_revisions` for audit and future
  restore tooling.
- Until the first publish, the public site uses the version-controlled default
  content in `src/lib/website/default-content.js`.

The editor manages homepage section order and visibility, About/Contact/
Eligibility page sections, success stories, navigation, footer lists, legal
pages and public brand colours. Footer column headings remain fixed by design.

## Setup

Run `npm run db:setup` after pulling the change. It creates the CMS tables in
addition to the existing authentication tables and is safe to run again.

The CMS API is registered under `website/content` in the central API dispatcher.
Read/write admin operations require the existing server-validated admin session.
The published-content endpoint is public and returns no draft data.

## URLs

- Admin: `/admin/website/manage`
- Public legal pages: `/privacy-policy`, `/terms-and-conditions`, `/disclaimer`,
  and `/copyright`
- API: `/api/website/content/query`, `/query-selector`, and `/update`
