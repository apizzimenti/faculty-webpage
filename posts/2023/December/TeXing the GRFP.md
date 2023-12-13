Last night, I (probably) took the last final I'll ever take. To celebrate, let's talk about the [NSF GRFP](https://www.nsfgrfp.org/) and how incredibly frustrating it is to format documents for submission.

When submitting for the GRFP, the _first thing to do_ is read [the solicitation](https://www.nsf.gov/pubs/2023/nsf23605/nsf23605.htm), which answers virtually every question you could have, save for the delineation between "broader impacts" and "intellectual merit." The most stringent thing about the NSF application is the formatting: your documents must

* be set on [American Letter](https://bit.ly/3GFbLqp) paper;
* have at least 11-point font;
* use _Times New Roman_ for text, _Cambria Math_ for typeset equations, and _Symbol_ for non-alphabetic things;
* have exactly one-inch margins with _nothing inside them_ (e.g. page numbers, titles, etc.);
* be no longer than two (Research) or three (Personal, Relevant Background, and Future goals) pages;
* have no subscript or superscript fonts;
* have no less than one-line spacing, _including_ in the references section;
* be submitted in PDF format.

These formatting minimums and length maximums force us to stand out by writing _better_, not by writing _more_. There are, sadly, two big problems:

1. the formatting checker is black-boxed, only accessible through the NSF Fastlane submission site, and provides minimal textual feedback for errors;
2. it's _really_ hard to enforce these formatting requirements with \\(\LaTeX\\), the main tool mathematicians and scientists use to typset math!

I couldn't fix the first issue, so I tried my hand at the second — and ended up completely overhauling the way I TeX.

<h3 class="blog-title">Setup</h3>
**Notes:**
* _If you are married to Overleaf as your typesetter_, feel free to skip this section. However, I strongly encourage you to use a local typesetter, like the ones mentioned below, instead! If you want to come to the dark side — and do it minimally — read on.
* _If you use Windows_, these installation instructions won't be exactly right. Follow the documentation provided with each of the tools listed below (BasicTeX, TeX Live Utility, TeX Live Manager, etc.) to properly install them. Sections following will be operating system-agnostic.

I have a 2019 MacBook Pro (with the 🤢... the 🤢... touchbar 🤮) running [macOS Sonoma 14.0](https://apple.co/485b7OG). I always use [Texifier](https://www.texifier.com/) for typesetting my documents; even though it's (a one-time payment of) $40, I don't have an account, strain my machine with heavy browser usage, be subject to compile-time limits without a paid account, or be constrained by the lack of (sometimes necessary!) bells and whistles. Texifier even has real-time compilation using its built-in TexpadTeX engine, which works exceptionally well even on large files!

As is the fickle nature of TeX, TexpadTeX sometimes falls short, and I need to use a heavier-duty, more mainstream typesetting engine. Because I only have 128GB of storage and run up against limits pretty frequently, I use the [BasicTeX distribution](https://tug.org/mactex/morepackages.html) installed through [homebrew](https://formulae.brew.sh/cask/basictex) — the standard MacTeX and TeXLive distributions clock in at ~5-6GB, while BasicTeX is only 90*MB*. Installing BasicTeX is motivated by the facts that it is extremely tiny and includes [XeTeX](https://tug.org/xetex/), an alternative typesetting engine which allows finer control over fonts and formatting.

Of course, this means we don't get an entire CTAN's worth of packages, so I installed the [TeX Live Utility](https://amaxwell.github.io/tlutility/), which is just a GUI for the [TeX Live Manager](https://tug.org/texlive/tlmgr.html); I [installed the Utility through homebrew](https://formulae.brew.sh/cask/tex-live-utility) and pointed it toward my BasicTeX distribution, located at `/usr/local/texlive/2023basic/bin/universal-darwin`, through the Utility's Settings menu. Now, whenever I get a `<package>.sty not found` error when compiling, I just pop open the Utility, search for the package, and install it.

**In summary:**

1. Install [homebrew](https://brew.sh/).
    * **_Recommended:_** install [Texifier](https://www.texifier.com/), but any typesetter will do.
2. Install [BasicTeX](https://tug.org/mactex/morepackages.html) via `brew install --cask basictex`.
    * BasicTeX is installed as TeXLive, located at `/Library/TeX/texbin`. If using a local typesetter (like Texifier, TeXstudio, TeXShop, etc.), point the typesetter to the BasicTeX installation.
3. Install [TeX Live Utility](https://amaxwell.github.io/tlutility/) via `brew install --cask tex-live-utility`.
    * Point the Utility toward the same BasicTeX install.


<h3 style="blog-title">Page formatting</h3>
Page formatting is relatively simple: standard document class, 11-point font, adjusting the margins by _one one-hundredth of an inch_ because the formatting police decided that XeLaTeX's 1-inch margins are too big. We also set `\pagestyle{empty}` to completely vacate headers and footers, and entirely remove page numbers. Next, set the line spacing to _exactly_ one line, remove paragraph indents (because indents waste space!) and set the paragraph skip to one line.

```latex
%%%%%%%%%%%%%%%%%%
% DOCUMENT SETUP %
%%%%%%%%%%%%%%%%%%
\documentclass[11pt]{article}
\usepackage[margin=1.01in]{geometry}
\usepackage{setspace}

% Set the page style as "empty" and vacates page numbers.
\pagestyle{empty}
\pagenumbering{gobble}

% Single line spacing, remove indents and paragraph skips.
\singlespacing
\setlength{\parindent}{0em}
\setlength{\parskip}{1em}
```

<h3 class="blog-title">Fonts</h3>
Fonts in \\(\LaTeX\\) are the _worst_: they're finicky, the documentation for them is typically poor, and there's no standardized way to deal with the litany of different font specifications. Even more, the NSF formatter can tell the difference between "authentic" versions of Times New Roman and Cambria Math and their bootleg counterparts; unfortunately, it's those bootleg counterparts that often end up on CTAN, advertising themselves at the real thing.

First, ensure that you set your typesetter to use XeTeX; this is doable locally by pointing your typesetter toward the correct executable (located in the same place as the BasicTeX installation), and on Overleaf by clicking on "Menu" in the top-left corner of the window and selecting XeTeX/XeLaTeX as your compiler.

Next, ensure you have the right fonts installed on your system: both Windows and macOS come preloaded with Times New Roman, but macOS does _not_ come with Cambria Math; feel free to [grab it from here](../../../assets/fonts/Cambria%20Math.ttf). Ensure that both these fonts are either installed on your system _or_ have the appropriate TrueType Font (`.ttf`) definition file located somewhere on your machine. Verify that you have the [fontspec package](https://ctan.org/pkg/fontspec?lang=en) installed (preinstalled on Overleaf, and can be installed via the TeX Live Utility or `tlmgr`). Note that _this will break if used with a typesetting engine other than XeTeX/XeLaTeX_, so don't be surprised by any weird errors. In the end, the code for setting the right fonts should look something like this: 

```latex
%%%%%%%%%%%%%%%%%%%%%
% FONTS AND SYMBOLS %
%%%%%%%%%%%%%%%%%%%%%
\usepackage{microtype, fontspec, unicode-math, hyperref, amsmath, amsfonts}
\usepackage[T1]{fontenc}

% Set body and math fonts.
\setmainfont{Times New Roman}
\setmathfont{Cambria Math}
```

Note that the last two lines _only works when you have these fonts installed on your system_, and has to be replaced with something like

```latex
\setmainfont{[path/to/Times New Roman.ttf]}
\setmathfont{[path/to/Cambria Math.ttf]}
```

<h3 style="blog-title">Bibliography</h3>
The bibliography was the trickiest part to get right: some of my colleagues manually wrote their references, which worked just fine. I, however, am extremely lazy, and didn't see why regular ol' LaTeX bibliography toolkits couldn't work. It turns out that things like bibtex/biber/etc. _enforce their own font rules_ and will use standard LaTeX fonts rather than ones set by the user. Here, we use [biblatex](https://ctan.org/pkg/biblatex) for citation management, with a [bibtex](https://ctan.org/pkg/bibtex?lang=en) backend (which allows us to use `.bib` files and other standard bibtex commands).

```latex
%%%%%%%%%%%%%%%%
% BIBLIOGRAPHY %
%%%%%%%%%%%%%%%%
\usepackage[backend=bibtex,style=numeric,natbib=true]{biblatex}

\newfontfamily{\TNR}{Times New Roman}
\renewcommand*{\bibfont}{\TNR}
\renewcommand*{\bibitemsep}{0pt}
\renewcommand{\UrlFont}{\rmfamily}

\DeclareFieldFormat{url}{\textsc{URL:} \TNR \url{#1}}
\DeclareFieldFormat{doi}{\textsc{DOI:} \TNR \url{#1}}
\DeclareFieldFormat[article,inproceedings,book,online]{title}{\emph{#1}}

\addbibresource{<your .bib file here>}
```

Then, stick the line

```latex
{\printbibliography[title={\phantom}]}
```

at the end of your file to insert your references. The `title={\phantom}` option completely removes the typical giant "References" header (which you'll have to add yourself).

In total, your TeX file should look something like

```latex
%%%%%%%%%%%%%%%%%%
% DOCUMENT SETUP %
%%%%%%%%%%%%%%%%%%
\documentclass[11pt]{article}
\usepackage[margin=1.01in]{geometry}
\usepackage{setspace}

% Set the page style as "empty" and vacates page numbers.
\pagestyle{empty}
\pagenumbering{gobble}

% Single line spacing, remove indents and paragraph skips.
\singlespacing
\setlength{\parindent}{0em}
\setlength{\parskip}{1em}

%%%%%%%%%%%%%%%%%%%%%
% FONTS AND SYMBOLS %
%%%%%%%%%%%%%%%%%%%%%
\usepackage{microtype, fontspec, unicode-math, hyperref, amsmath, amsfonts}
\usepackage[T1]{fontenc}

% Set body and math fonts.
\setmainfont{Times New Roman}
\setmathfont{Cambria Math}

%%%%%%%%%%%%%%%%
% BIBLIOGRAPHY %
%%%%%%%%%%%%%%%%
\usepackage[backend=bibtex,style=numeric,natbib=true]{biblatex}

\newfontfamily{\TNR}{Times New Roman}
\renewcommand*{\bibfont}{\TNR}
\renewcommand*{\bibitemsep}{0pt}
\renewcommand{\UrlFont}{\rmfamily}

\DeclareFieldFormat{url}{\textsc{URL:} \TNR \url{#1}}
\DeclareFieldFormat{doi}{\textsc{DOI:} \TNR \url{#1}}
\DeclareFieldFormat[article,inproceedings,book,online]{title}{\emph{#1}}

\addbibresource{<your .bib file here>}

%%%%%%%%%%%%%%%%%%%
% IMAGES, FIGURES %
%%%%%%%%%%%%%%%%%%%
\usepackage{graphicx, caption, tikz, wrapfig}
\captionsetup{labelfont=bf, font={it}, format=plain}

% A command for emphasizing something, typical for GRFP statements.
\newcommand{\header}[1]{\underline{\textbf{#1}.}}

\begin{document}
    ...
    \header{References}
    {\printbibliography[title={\phantom}]}
\end{document}
```

Best of luck GRFPing!
