@echo off
echo 正在初始化 Git 倉庫...
git init

echo.
echo 正在添加所有文件...
git add .

echo.
echo 正在提交更改...
git commit -m "Initial commit: Min-An's Portfolio website"

echo.
echo 正在添加遠程倉庫...
git remote add origin https://github.com/Cookie0104/minanportfolio.git

echo.
echo 正在推送到 GitHub...
git branch -M main
git push -u origin main

echo.
echo 完成！如果遇到錯誤，請檢查：
echo 1. 是否已安裝 Git
echo 2. 是否已登入 GitHub（使用 git config --global user.name 和 git config --global user.email）
echo 3. 是否已設置 GitHub 認證（Personal Access Token 或 SSH key）
pause



