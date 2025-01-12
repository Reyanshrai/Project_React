# Git Workflow Instructions

## Adding and Pushing Code to GitHub
1. Stage all changes:
   ```bash
   git add .
   ```
2. Commit the changes with a meaningful message:
   ```bash
   git commit -m "Your Name: <Describe what you did>"
   ```
3. Check your current branch name (it should match your name):
   ```bash
   git branch
   ```
4. Push the changes to your branch:
   ```bash
   git push origin -u <your-branch-name>
   ```

---

## Checking All Branches
To list all branches (local and remote):
```bash
git branch -a
```

---

## Switching Branches
To switch to a specific branch:
```bash
git checkout <branch-name>
```
Alternatively:
```bash
git switch <branch-name>
```

---

## Fetching and Updating Code from the Main Repository
1. Fetch the latest updates from the remote repository:
   ```bash
   git fetch origin
   ```
2. Merge the `main` branch into your current branch:
   ```bash
   git merge main
   ```

---

## Rebasing Your Branch onto Main
1. Rebase your branch onto the `main` branch:
   ```bash
   git rebase main
   ```
2. If there are conflicts, resolve them and continue the rebase:
   ```bash
   git rebase --continue
   ```

---

## Pushing Updated Code to Your Branch
After merging or rebasing, push the updated code to your branch:
```bash
git push origin <your-branch-name>
```

---

## Regular Updates
To keep your branch up-to-date with the latest changes from `main`:

1. Fetch the latest updates:
   ```bash
   git fetch origin
   ```
2. Merge the updates from main:
   ```bash
   git pull origin main
   ```   

## Notes
- Always write meaningful commit messages that describe the changes you made.
- Ensure you are on the correct branch before pushing or merging code.
- Use `git status` frequently to check the current state of your repository.

---

This document provides a clear and structured guide for working with Git in a collaborative environment. Let me know if you need further clarification!
