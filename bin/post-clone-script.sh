#!/bin/sh

echo "🚧 Preparing dependencies"
npm install
npm run prepare

echo "🚧 Configuring project"
read -p "  Project name: " project_name
read -p "  Project description: " project_description

description_tag="project-description"
description_template="s/$description_tag/$project_description/"

name_tag="project-name"
name_template="s/$name_tag/$project_name/"

change_template="$name_template; $description_template"

echo "⚡️ Configuring project"
sed -i.bak "$change_template" README.md
echo "  ✅ README.md"
sed -i.bak "$change_template" package.json
echo "  ✅ package.json"

echo "🗑 Removing backup files"
rm *.bak
