
import React from 'react';

const SidebarContent: React.FC = () => {
  return (
    <>
      <h1 className="text-gemini-blue-300">No-Code Project Scaler</h1>
      <p>
        <strong>Your goal:</strong> understand how to <em>structure a scalable no-code project</em> so it doesn’t fall apart when you add more users, features, or automations.
      </p>

      <h2 id="blueprint-mode">Blueprint Mode</h2>
      <h3 id="goal">GOAL</h3>
      <p>Create a no-code project structure that stays fast, organized, and easy to expand—even when the app grows to thousands of records, many workflows, and multiple collaborators.</p>
      
      <h3 id="stack-example-setup">STACK (Example Setup)</h3>
      <ul>
        <li><strong>Frontend:</strong> Webflow, Bubble, or Glide</li>
        <li><strong>Backend:</strong> Airtable, Xano, or Bubble database</li>
        <li><strong>Automations:</strong> Make.com or Zapier</li>
        <li><strong>Auth:</strong> Native platform authentication</li>
        <li><strong>Storage:</strong> Cloudinary / Firebase Storage</li>
      </ul>

      <h3 id="architecture">ARCHITECTURE</h3>
      <p>Think of your project like a city:</p>
      <ol>
        <li><strong>Database = foundation and roads</strong></li>
        <li><strong>Workflows/Automations = traffic lights + delivery routes</strong></li>
        <li><strong>Frontend = buildings</strong></li>
        <li><strong>Permissions = who can enter which building</strong></li>
      </ol>
      <p>A scalable no-code system follows this pattern:</p>

      <h4>1. Clean, normalized database</h4>
      <p>Keep data in separate, well-defined tables:</p>
      <ul>
        <li><strong>Users</strong></li>
        <li><strong>Items/Products/Posts</strong></li>
        <li><strong>Transactions or Logs</strong></li>
        <li><strong>Settings / System Config</strong></li>
        <li><strong>Integrations (Webhook Receipts, API Tokens)</strong></li>
      </ul>
      <p>Rules:</p>
      <ul>
        <li>Never mix multiple concepts in one table.</li>
        <li>Never store computed values (calculate them on demand or via automation).</li>
        <li>Add fields for scalability: <code>status</code>, <code>type</code>, <code>role</code>, <code>source</code>, <code>updated_at</code>.</li>
      </ul>

      <h4>2. Thin frontend, thick backend</h4>
      <p>Don’t let the frontend do heavy work. Move logic to Xano, Bubble backend workflows, or Make automations. This avoids slow pages and protects from accidental breakage.</p>

      <h4>3. Separate “core logic” from “UI logic”</h4>
      <ul>
        <li><strong>Core logic:</strong> “Create order,” “Assign role,” “Calculate total.”</li>
        <li><strong>UI logic:</strong> “Show this banner,” “Enable button,” “Highlight item.”</li>
      </ul>

      <h4>4. Versioning + naming conventions</h4>
      <p>Use naming patterns like:</p>
      <ul>
        <li><strong>Workflows:</strong> <code>orders_create_v1</code>, <code>users_onboard_v2</code></li>
        <li><strong>Tables:</strong> singular nouns (<code>Order</code>, <code>User</code>)</li>
        <li><strong>Fields:</strong> all lowercase with underscores (<code>total_price</code>, <code>role_type</code>)</li>
      </ul>

      <h4>5. Build with “states,” not “pages”</h4>
      <p>Instead of creating new pages for everything, create one page with dynamic states (in Bubble) or one Webflow CMS template reused for many items.</p>
      
      <h4>6. Event-driven automations</h4>
      <p>Instead of many “if this then that” spaghetti flows, use trigger tables or event logs. This prevents duplicate runs and race conditions.</p>

      <h4>7. Role-based permissions</h4>
      <p>Before scaling, define roles (admin, manager, member, guest) and rules (read, write, update, delete). Centralize them.</p>

      <h3 id="implementation-step-by-step">IMPLEMENTATION (Step-by-Step)</h3>
      <p><strong>Step 1: Design the data model before building</strong></p>
      <pre><code>User
  id, email, role, last_login

Project
  id, owner_id (FK → User), name, status

Task
  id, project_id (FK → Project), assigned_to, due_date, completed
</code></pre>
      <p><strong>Step 2: Build backend logic</strong> (e.g., <code>user_signup_v1</code>)</p>
      <p><strong>Step 3: Add frontend pages</strong> (Dashboard, Detail, Settings, Admin)</p>
      <p><strong>Step 4: Add automations via a “Jobs” table</strong></p>
      <p><strong>Step 5: Add monitoring</strong> via a "Logs" table.</p>

      <h3 id="testing">TESTING</h3>
      <ul>
        <li>Can you add 10× more items without slowing down?</li>
        <li>Are automations idempotent? (run twice = no damage)</li>
      </ul>
    </>
  );
};

export default SidebarContent;
