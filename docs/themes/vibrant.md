# Vibrant: design journal

*Status: built in phase 3. Awaiting the owner's review in the gallery.*

## Brief

- **Principle broken, and its source:** value contrast. Edges and text are seen through differences in lightness, not hue; complementary hues at equal value make their shared edge vibrate until the boundary seems to dissolve (Josef Albers, *Interaction of Color*, 1963).
- **The wrong rule:** contrast comes from hue, never from lightness.
- **Axes:** colour. Structure follows: hierarchy is shown by changing hue, never by going darker or lighter.
- **Costume check:** two costumes sit nearby. 1960s psychedelic posters used vibrating complementaries with swirling hand-drawn lettering; Vibrant is all flat rectangles, with no lettering effects. Albers' own nested squares are designer-good; nothing here is a square within a square. A third came up while building (see First instincts): neo-brutalist web design, which is flat saturated blocks with thick black borders and hard black shadows. Vibrant has no black anywhere but the text, so it can't be that.
- **Signature moves:**
  - every colour on the page has the same lightness (CIELAB L\* 58, so every one has the same WCAG luminance): red, vermilion, ochre, olive, green, jade, teal, cyan, blue, periwinkle, violet, purple, magenta and pink
  - every field meets another hue at a hard edge, chosen to vibrate: red against teal, green against magenta, blue against ochre, violet against olive
  - no grey, no white and no black, except the text
  - headings are bands of a different hue, not darker type
  - syntax highlighting by coloured chips behind the tokens, all at the same lightness as the code block, with every token in black
  - table rows alternate between two equal-value hues
  - the thematic break is two colours meeting edge to edge
- **Every surface:**
  - **Home and lists:** each post a field of its own hue in a frame of its complement.
  - **Tag list and post tags:** chips of rotating hues.
  - **Rails and footer:** more fields, more frames.
  - **404:** the same treatment.
  - **More bad:** an ochre field in a blue frame.
- **Rules it breaks:** see `rules_broken` in `assets/themes/vibrant/theme.yaml`.
- **Legibility plan:**
  - Text is the one value contrast on the page, so the rule bends exactly once. All text is black, and every field is at L\* 58, so every piece of text is about 6.2:1 against whatever it sits on.
  - Body text is 18px Trebuchet MS with line height 1.65, on lines of about 34em.
  - Links are underlined, since colour can't separate them.
  - No fine stripes or checks anywhere (RULES.md tier 1, pattern glare). The striped table rows are each over 2em tall and have no luminance contrast at all.
- **Smell risks:** low for the surface smell; nothing here is slate or indigo. The risk is a "bold, playful" brand look, which is the smell's cheerful cousin. The vibration is what keeps it from being cheerful: nothing here is comfortable to look at for long, except the text.

## First instincts

- **Thick black borders round every field.** The obvious way to make bright blocks look deliberate, and exactly neo-brutalism. It also adds value contrast, which the rule forbids. Every border is an equal-value hue instead.
- **Dark text for headings, light text for captions,** to make a hierarchy. Hierarchy by value is what the rule bans; it's all done with hue bands.
- **Syntax highlighting in coloured text.** Coloured text would need lightness contrast against the code block. Chips of colour behind black tokens keep the rule.

## Decisions

- **The palette** was computed, not picked: each hue is the most saturated colour sRGB allows at L\* 58. At that lightness black text clears AA on every one of them.
- **Fonts:** system only. Trebuchet MS, falling back to the device's sans-serif.

## Log

- 2026-10-19: First version. All tests pass at the first attempt, since black on L\* 58 clears AA on every field by construction. In the gallery it's the hardest of the set to look at, and the text is still easy to read.

## Open questions
