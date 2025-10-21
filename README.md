# 🛡️ SecurePilot: Role-Based Access with MariaDB + Descope

**Secure dashboards with fine-grained access control, powered by FastAPI, Descope, and MariaDB**

SecurePilot is a plug-and-play framework for building secure, multi-user dashboards. It combines Descope’s modern authentication (OAuth, magic links, MFA) with MariaDB’s native privilege system to enforce real-time role-based access across the stack.

---

## 🚀 Features

- 🔐 Secure login with OAuth, magic links, and multi-factor authentication (MFA)
- 🧑‍💼 Role-based access to dashboards, queries, and data exports
- 🛠️ Admin panel for managing users and permissions
- 📜 Audit trail and activity logs for compliance
- 📈 Scalable architecture for enterprise deployment

---

## ❗ Problem Statement

Most open-source dashboards lack robust user management. Without secure authentication and granular access control, sensitive data can be exposed or misused. Developers need a modular solution that integrates identity management with database-level privileges.

---

## 🎯 Objective

SecurePilot provides a secure dashboard framework that:
- Authenticates users via Descope
- Maps user roles to MariaDB privileges
- Dynamically renders dashboards based on access level
- Logs all activity for transparency and compliance

---

## 🛠️ Tech Stack

| Layer        | Technology        |
|--------------|-------------------|
| Frontend     | React             |
| Backend      | FastAPI           |
| Auth         | Descope SDK       |
| Database     | MariaDB           |
| Visualization| Chart.js / D3.js  |
| Deployment   | Docker + NGINX    |


