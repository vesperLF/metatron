const hemoRanges = [
  {
    caste: "Red",
    shade: {
      min: "Maroon",
      med: "Rust",
      max: "Scarlet"
    },
    range: {
      min: 346,
      max: 15
    }
  },
  {
    caste: "Bronze",
    shade: {
      min: "Umber",
      med: "Cola",
      max: "Clay"
    },
    range: {
      min: 16,
      max: 45
    }
  },
  {
    caste: "Yellow",
    shade: {
      min: "Cider",
      med: "Mustard",
      max: "Gold"
    },
    range: {
      min: 46,
      max: 75
    }
  },
  {
    caste: "Lime",
    shade: {
      min: "",
      med: "",
      max: ""
    },
    range: {
      min: 76,
      max: 105
    }
  },
  {
    caste: "Green",
    shade: {
      min: "Pine",
      med: "Olive",
      max: "Clover"
    },
    range: {
      min: 106,
      max: 135
    }
  },
  {
    caste: "Jade",
    shade: {
      min: "Moss",
      med: "Viridian",
      max: "Fern"
    },
    range: {
      min: 136,
      max: 165
    }
  },
  {
    caste: "Teal",
    shade: {
      min: "Cyprus",
      med: "Turquoise",
      max: "Cyan"
    },
    range: {
      min: 166,
      max: 195
    }
  },
  {
    caste: "Blue",
    shade: {
      min: "Prussian",
      med: "Cobalt",
      max: "Aegean"
    },
    range: {
      min: 196,
      max: 225
    }
  },
  {
    caste: "Indigo",
    shade: {
      min: "Midnight",
      med: "Navy",
      max: "Denim"
    },
    range: {
      min: 226,
      max: 255
    }
  },
  {
    caste: "Purple",
    shade: {
      min: "Aubergine",
      med: "Jam",
      max: "Amethyst"
    },
    range: {
      min: 256,
      max: 285
    }
  },
  {
    caste: "Violet",
    shade: {
      min: "Byzantine",
      med: "Magenta",
      max: "Orchid"
    },
    range: {
      min: 286,
      max: 315
    }
  },
  {
    caste: "Fuchsia",
    shade: {
      min: "Wine",
      med: "Cerise",
      max: "Rose"
    },
    range: {
      min: 316,
      max: 345
    }
  },
];

module.exports = {
    name: 'hemo',
    description: 'Returns a detailed hemospectrum analysis of a given hex code.',
    async execute(msg, args) {
        try {
          if (args.length < 1)
            throw "ERROR: No hex code supplied."

          let hex = args[0];
          var shorthandRegex = /^(#|0x)?([a-f\d])([a-f\d])([a-f\d])$/i;

          //console.log("HEX: " + hex);

          hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
          });

          //console.log("HEX: " + hex);

          hex = /^(#|0x)?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          //console.log(hex === null)
          if (hex === null)
            throw "ERROR: Not a valid hex code."

          //console.log("RESULT: " + hex);
          let rgb = hex ? {
            r: parseInt(hex[2], 16),
            g: parseInt(hex[3], 16),
            b: parseInt(hex[4], 16)
          } : null;
          hex = `${hex[2]}${hex[3]}${hex[4]}`;
          console.log(hex);

          // Converting from RGB to HSB
          var hsb = {
            h: '',
            s: '',
            b: ''
          };
          var cmax, cmin, rc, gc, bc;
          cmax = Math.max(rgb.r, rgb.g, rgb.b);
          cmin = Math.min(rgb.r, rgb.g, rgb.b);
          hsb.b = Math.round((parseFloat(cmax) / 255) * 100);

          if(cmax != 0)
            hsb.s = Math.round((parseFloat(cmax - cmin) / parseFloat(cmax)) * 100);
          else
            hsb.s = 0;
          
          if(hsb.s == 0) {
            hsb.h = 0
          } else {
            rc = parseFloat(cmax-rgb.r) / parseFloat(cmax-cmin);
            gc = parseFloat(cmax-rgb.g) / parseFloat(cmax-cmin);
            bc = parseFloat(cmax-rgb.b) / parseFloat(cmax-cmin);

            if (rgb.r == cmax)
              hsb.h = parseFloat(bc - gc);
            else if (rgb.g == cmax)
              hsb.h = 2. + parseFloat(rc - bc);
            else
              hsb.h = 4. + parseFloat(gc - rc);

            hsb.h = parseFloat(hsb.h) / 6.;
            if (hsb.h < 0)
                hsb.h = hsb.h + 1.;
          }

          hsb.h = Math.round(hsb.h * 360.);

          //console.log("H: " + hsb.h + " S: " + hsb.s + " B: " + hsb.b);

          let hemo = HSBtoHemo(hsb);

          console.log(hex);

          var embedResponse = {
            color: parseInt(`0x${hex}`),
            description: `Hemospectrum analysis for **#${hex}**:`,
            fields: [
              {
                name: 'Red',
                value: rgb.r,
                inline: true
              },
              {
                name: 'Green',
                value: rgb.g,
                inline: true
              },
              {
                name: 'Blue',
                value: rgb.b,
                inline: true
              },
              {
                name: 'Hue',
                value: hsb.h,
                inline: true
              },
              {
                name: 'Saturation',
                value: hsb.s,
                inline: true
              },
              {
                name: 'Brightness',
                value: hsb.b,
                inline: true
              },
            ]
          };

          if(hemo.caste === 'Lime' && hsb.s >= 10) {
            let newHemoIndex = hsb.h < 90 ? 2 : 4;

            embedResponse.fields.push(
              {
                name: 'IMPORTANT NOTE',
                value: `The Hue value of ${hsb.h} places this blood color in the **${hemo.caste}blood** caste. However, since this caste does not technically exist, the next closest caste is the **${hemoRanges[newHemoIndex].caste}blood** caste. All following information is derived from this assumption.`
              }
            );

            hemo.caste = hemoRanges[newHemoIndex].caste;
            if (hemo.shadeIndex == 'min')
              hemo.shade = hemoRanges[newHemoIndex].shade.min;
            else if (hemo.shadeIndex == 'med')
              hemo.shade = hemoRanges[newHemoIndex].shade.med;
            else
              hemo.shade = hemoRanges[newHemoIndex].shade.max;
          }

          embedResponse.fields.push(
            hsb.s >= 10 ?(
              {
                name: 'Caste',
                value: `The Hue value of ${hsb.h} places this blood color in the **${hemo.caste}blood** caste.`,
                inline: false
              },
              {
                name: 'Subshade',
                value: `The Brightness value of ${hsb.b} places this blood color in the **${hemo.shade}blood** subshade.`,
                inline: false
              }) :
              ({
                name: 'Caste',
                value: `The Saturation value of ${hsb.s} is too low to place this blood color in **any** blood caste.`,
                inline: false
              },
              {
                name: 'Subshade',
                value: `As this blood color does not exist, it is not in **any** subshade.`,
                inline: false
              })
            
          );
          embedResponse.title = `Hemospectrum | ${hemo.caste}§${hemo.shade}`;
          
          msg.channel.send({ embed: embedResponse });

        } catch (err) {
          if (err.length > 0)
            msg.channel.send(err);
        }
    },
  };

  function HSBtoHemo(hsb) {
    let hemo = {
      caste: '',
      shade: '',
      shadeIndex: ''
    };

    for (let hemoRange of hemoRanges) {
      let isWraparound = hemoRange.range.min > hemoRange.range.max;
      let isOverMin = hemoRange.range.min <= hsb.h;
      let isUnderMax = hsb.h <= hemoRange.range.max;
      
      if (isWraparound == (isOverMin && isUnderMax)) {
        hemo.caste = hemoRange.caste;
        
        if (hsb.b <= 32) {
          hemo.shade = hemoRange.shade.min;
          hemo.shadeIndex = 'min';
        } else if (hsb.b <= 66) {
          hemo.shade = hemoRange.shade.med;
          hemo.shadeIndex = 'med';
        } else {
          hemo.shade = hemoRange.shade.max;
        }
        break;
      }
    }

    console.log(hemo);

    return hemo;

  }