# 📦 NPM Package Publishing Guideline

**Purpose**
This document defines the standard process and best practices for publishing a JavaScript/TypeScript package to the **npm registry**, ensuring consistency, traceability, and long-term maintainability.

---

## 1. Prerequisites

### 1.1 Required tools

* **Node.js** (includes npm)
* **Git**
* A **GitHub repository**
* An **npm account**

Verify installation:

```bash
node -v
npm -v
git --version
```

---

## 2. npm Account Setup

### 2.1 Create npm account

* Register at: [https://www.npmjs.com](https://www.npmjs.com)

### 2.2 Login from CLI

```bash
npm login
```

Verify:

```bash
npm whoami
```

---

## 3. Project Structure

### 3.1 Recommended structure

```
project-root/
├─ package.json
├─ README.md
├─ LICENSE
├─ index.js        # or dist/
└─ .gitignore
```

---

## 4. `package.json` Specification

### 4.1 Required fields

```json
{
  "name": "your-package-name",
  "version": "1.0.0",
  "description": "Short description of the package",
  "main": "index.js",
  "license": "MIT"
}
```

### 4.2 Naming rules

* Must be **globally unique**
* Lowercase only
* No spaces
* Use `-` instead of `_`

Check availability:

```bash
npm view your-package-name
```

---

## 5. GitHub Integration (IMPORTANT)

npm displays GitHub links based on metadata.

### 5.1 Repository

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/ORG/REPO.git"
  }
}
```

### 5.2 Homepage

```json
{
  "homepage": "https://github.com/ORG/REPO#readme"
}
```

### 5.3 Issues

```json
{
  "bugs": {
    "url": "https://github.com/ORG/REPO/issues"
  }
}
```

---

## 6. README Requirement

`README.md` is rendered on the npm website.

**Minimum content**

```md
# Package Name

## Installation
npm install package-name

## Usage
Example usage here

## License
MIT
```

---

## 7. Versioning Rules (Semantic Versioning)

npm **does not allow overwriting published versions**.

Use:

```bash
npm version patch   # bugfix
npm version minor   # backward-compatible feature
npm version major   # breaking change
```

This automatically:

* Updates `package.json`
* Creates a git commit
* Creates a git tag

---

## 8. Publish Workflow

### 8.1 Dry run (recommended)

```bash
npm pack
```

### 8.2 Publish public package

```bash
npm publish --access public
```

### 8.3 Scoped package example

```json
{
  "name": "@org/package-name"
}
```

Publish:

```bash
npm publish --access public
```

---

## 9. File Control

### 9.1 Use `files` field

```json
{
  "files": ["dist", "index.js"]
}
```

### 9.2 Or `.npmignore`

```
node_modules
src
tests
.env
```

---

## 10. Validation Checklist

Before publishing:

* [ ] `npm whoami` works
* [ ] Version updated
* [ ] `repository`, `homepage`, `bugs` defined
* [ ] README.md exists
* [ ] No secrets included
* [ ] `npm pack` verified

---

## 11. Common Errors & Fixes

### 11.1 403 Forbidden

* Version already exists
* Not logged in
* Missing `--access public`

### 11.2 402 Payment Required

* Scoped package defaulted to private

Fix:

```bash
npm publish --access public
```

---

## 12. Post-Publish Management

```bash
npm deprecate pkg "message"
npm owner add user pkg
npm owner ls pkg
```

Unpublish (within 72 hours):

```bash
npm unpublish pkg@version
```

---

## 13. Best Practices

* Prefer **scoped packages**
* Always publish from `main` branch
* Tag releases
* Keep changelog
* Automate with GitHub Actions
* Never publish secrets

---

## 14. Recommended Automation (Optional)

* GitHub Actions for:

  * CI tests
  * Version bump
  * Auto publish
* Protected branches
* Release tags as publish triggers

---

## 15. Reference Commands

```bash
npm login
npm whoami
npm version patch
npm publish
npm pack
```

---

