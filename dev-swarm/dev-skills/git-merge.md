# Git Merge Strategies

## Partial Merge: Checkout Specific Folders from Another Branch

```bash
# Switch to the target branch (where you want the folders)
git checkout target-branch

# Checkout specific folders from source branch
git checkout source-branch -- path/to/folder1 path/to/folder2

# Commit the changes
git add path/to/folder1 path/to/folder2
git commit -m "Merge specific folders from source-branch"
```

## Squash Merge

**What it does:**
- Takes all changes from the source branch
- Does NOT keep its commit history
- Creates one new commit on the target branch

**Commands:**
```bash
git checkout target-branch
git merge --squash source-branch
git commit -m "Merge source-branch changes (squashed)"
```
