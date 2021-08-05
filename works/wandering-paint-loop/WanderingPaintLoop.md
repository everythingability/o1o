---
tags: redblue
---

# Wandering Paint Loop

This generative work starts with a "perfect" gradient and make a random gradient brushstroke. At that point the code analyses the pixels and measures the balance between red  and blue used in the now defaced image, and attempts to "correct" the mess by applying another random brushstroke. 

![Wandering](index.png)

It stops when it *thinks* it has restored the "balance" between red and blue, with both at 50%.

<video width="1000" height="800" controls>
  <source src="gradient.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>


