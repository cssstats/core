var cssFontParser = require('cssfontparser');

module.exports = function handleFontShorthand(obj) {
  if (obj.byProperty.font) {
    obj.byProperty.font.forEach(function(fontShorthand) {
      var fontProperties = cssFontParser(fontShorthand.value);

      if (!fontProperties) {
        return;
      }

      if (fontProperties.style) {
        obj.byProperty.fontStyle = obj.byProperty.fontStyle || [];

        obj.byProperty.fontStyle.push(
          generateDeclaration(
            'font-style',
            fontProperties.style,
            fontShorthand.index
          )
        );
      }

      if (fontProperties.variant) {
        obj.byProperty.fontVariant = obj.byProperty.fontVariant || [];

        obj.byProperty.fontVariant.push(
          generateDeclaration(
            'font-variant',
            fontProperties.variant,
            fontShorthand.index
          )
        );
      }

      if (fontProperties.weight) {
        obj.byProperty.fontWeight = obj.byProperty.fontWeight || [];

        obj.byProperty.fontWeight.push(
          generateDeclaration(
            'font-weight',
            fontProperties.weight,
            fontShorthand.index
          )
        );
      }

      if (fontProperties.size) {
        obj.byProperty.fontSize = obj.byProperty.fontSize || [];

        obj.byProperty.fontSize.push(
          generateDeclaration(
            'font-size',
            fontProperties.size,
            fontShorthand.index
          )
        );
      }

      if (fontProperties.lineHeight) {
        obj.byProperty.lineHeight = obj.byProperty.lineHeight || [];

        obj.byProperty.lineHeight.push(
          generateDeclaration(
            'line-height',
            fontProperties.lineHeight,
            fontShorthand.index
          )
        );
      }

      if (fontProperties.family) {
        obj.byProperty.fontFamily = obj.byProperty.fontFamily || [];

        obj.byProperty.fontFamily.push(
          generateDeclaration(
            'font-family',
            fontProperties.family.join(', '),
            fontShorthand.index
          )
        );
      }
    });
  }
}

function generateDeclaration(prop, value, index) {
  return {
    type: 'decl',
    prop: prop,
    value: value,
    index: index
  };
}
