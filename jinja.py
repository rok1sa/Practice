#!/usr/bin/env python3
from jinja2 import Template
from flask import render_template


def func1():
    name = input("Enter your name: ")
    tm = Template("Hello {{ name }}")
    msg = tm.render(name=name)
    print(msg)
    return render_template('jinja.html', name=name)
