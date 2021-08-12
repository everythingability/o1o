import markdown
md  = open("works.md").read()
html = markdown.markdown(md)
print(html)