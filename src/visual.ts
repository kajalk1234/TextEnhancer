/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
module powerbi.extensibility.visual {

    import valueFormatter = powerbi.extensibility.utils.formatting.valueFormatter;

    export module DataViewObjects {

        /**
         * Gets the value of the given object/property pair.
         * @param {DataViewObjects} objects           - List of category objects.
         * @param {DataViewObjectPropertyIdentifier} propertyId     - Variable to store property id of category objects
         * @param {T} defaultValue                    - Variable that stores the default value of object
         */
        export function getValue<T>(
            objects: DataViewObjects,
            propertyId: DataViewObjectPropertyIdentifier,
            defaultValue?: T): T {
            if (!objects) {
                return defaultValue;
            }
            const objectOrMap: DataViewObject = objects[propertyId.objectName];
            const object: DataViewObject = <DataViewObject>objectOrMap;
            return DataViewObject.getValue(object, propertyId.propertyName, defaultValue);
        }

        /**
         * Gets an object from objects.
         * @param {DataViewObjects} objects           - List of category objects.
         * @param {string} objectName                 - Variable to store object name
         * @param {DataViewObject} defaultValue       - Variable that stores default value of object
         */
        export function getObject(
            objects: DataViewObjects,
            objectName: string,
            defaultValue?: DataViewObject): DataViewObject {
            if (objects && objects[objectName]) {
                return objects[objectName];
            } else {
                return defaultValue;
            }
        }

        /**
         * Gets a map of user-defined objects.
         * @param {DataViewObjects} objects           - List of category objects.
         * @param {string} objectName                 - Variable to store object name
         */
        export function getUserDefinedObjects(objects: DataViewObjects, objectName: string): DataViewObjectMap {
            if (objects && objects[objectName]) {
                return <DataViewObjectMap>objects[objectName];
            }
        }

        /**
         * Gets the solid color from a fill property.
         * @param {DataViewObjects} objects           - List of category objects.
         * @param {DataViewObjectPropertyIdentifier} propertyId     - Variable to store property id of category objects
         * @param {string} defaultColor               - Variable to store the default color value
         */
        export function getFillColor(
            objects: DataViewObjects,
            propertyId: DataViewObjectPropertyIdentifier,
            defaultColor?: string): string {
            const value: Fill = getValue(objects, propertyId);
            if (!value || !value.solid) {
                return defaultColor;
            }
            return value.solid.color;
        }
    }

    export module DataViewObject {

        /**
         * Method that sets the value property
         * @param {DataViewObject} object               - Category object
         * @param {string} propertyName                 - Variable to store the property name for the object
         * @param {T} defaultValue                      - Variable that stores the default value of object
         */
        export function getValue<T>(object: DataViewObject, propertyName: string, defaultValue?: T): T {
            if (!object) {
                return defaultValue;
            }
            const propertyValue: T = <T>object[propertyName];
            if (propertyValue === undefined) {
                return defaultValue;
            }
            return propertyValue;
        }

        /**
         * Gets the solid color from a fill property using only a propertyName
         * @param {DataViewObjects} objects       - List of category objects.
         * @param {string} propertyName           - Variable to store the property name for the object
         * @param {string} defaultColor           - Variable to store the default color value
         */
        export function getFillColorByPropertyName(
            objects: DataViewObjects,
            propertyName: string,
            defaultColor?: string): string {
            const value: Fill = DataViewObject.getValue(objects, propertyName);
            if (!value || !value.solid) {
                return defaultColor;
            }
            return value.solid.color;
        }
    }

    export interface ITextSettings {
        color: string;
        transparency: number;
        fontSize: number;
        alignment: string;
        alignmentV: string;
        direction: string;
        letterSpacing: number;
        lineHeight: number;
        wordSpacing: number;
        perspective: number;
        textIndent: number;
        lineIndent: number;
        textRotate: number;
        skewX: number;
        skewY: number;
    }

    export interface IStaticTextSettings {
        showColon: boolean;
        textPosition: string;
        textDecoration: string;
        textTransform: string;
        textShadow: string;
        textShadowBlur: string;
        textShadowColor: string;
        fontWeight: string;
        backgroundColor: string;
        transparency: number;
        fontFamily: string;
        boldStyle: boolean;
        underline: boolean;
        overline: boolean;
        strikeThrough: boolean;
        italicStyle: boolean;
        postText: string;
    }

    export interface IDynamicTextContainer {
        textContainer: string;
        lengthContainer: number;
    }

    export interface IDynamicTextSettings {
        backgroundColor: string;
        transparency: number;
        textDecoration: string;
        textTransform: string;
        textShadow: string;
        textShadowBlur: string;
        textShadowColor: string;
        fontWeight: string;
        fontFamily: string;
        boldStyle: boolean;
        underline: boolean;
        overline: boolean;
        strikeThrough: boolean;
        italicStyle: boolean;
    }

    export let questTextProperties: {
        textSettings: {
            color: DataViewObjectPropertyIdentifier;
            transparency: DataViewObjectPropertyIdentifier;
            fontSize: DataViewObjectPropertyIdentifier;
            postText: DataViewObjectPropertyIdentifier;
            alignment: DataViewObjectPropertyIdentifier;
            alignmentV: DataViewObjectPropertyIdentifier;
            direction: DataViewObjectPropertyIdentifier;
            letterSpacing: DataViewObjectPropertyIdentifier;
            lineHeight: DataViewObjectPropertyIdentifier;
            wordSpacing: DataViewObjectPropertyIdentifier;
            perspective: DataViewObjectPropertyIdentifier;
            textIndent: DataViewObjectPropertyIdentifier;
            lineIndent: DataViewObjectPropertyIdentifier;
            textRotate: DataViewObjectPropertyIdentifier;
            skewX: DataViewObjectPropertyIdentifier;
            skewY: DataViewObjectPropertyIdentifier;
        };
        staticTextSettings: {
            showColon: DataViewObjectPropertyIdentifier;
            textPosition: DataViewObjectPropertyIdentifier;
            textDecoration: DataViewObjectPropertyIdentifier;
            textTransform: DataViewObjectPropertyIdentifier;
            textShadow: DataViewObjectPropertyIdentifier;
            textShadowBlur: DataViewObjectPropertyIdentifier;
            textShadowColor: DataViewObjectPropertyIdentifier;
            fontWeight: DataViewObjectPropertyIdentifier;
            backgroundColor: DataViewObjectPropertyIdentifier;
            transparency: DataViewObjectPropertyIdentifier;
            postText: DataViewObjectPropertyIdentifier;
            fontFamily: DataViewObjectPropertyIdentifier;
            boldStyle: DataViewObjectPropertyIdentifier;
            italicStyle: DataViewObjectPropertyIdentifier;
            underline: DataViewObjectPropertyIdentifier;
            overline: DataViewObjectPropertyIdentifier;
            strikeThrough: DataViewObjectPropertyIdentifier;
        };
        dynamicSettings: {
            backgroundColor: DataViewObjectPropertyIdentifier;
            transparency: DataViewObjectPropertyIdentifier;
            textDecoration: DataViewObjectPropertyIdentifier;
            textTransform: DataViewObjectPropertyIdentifier;
            textShadow: DataViewObjectPropertyIdentifier;
            textShadowBlur: DataViewObjectPropertyIdentifier;
            textShadowColor: DataViewObjectPropertyIdentifier;
            fontWeight: DataViewObjectPropertyIdentifier;
            fontFamily: DataViewObjectPropertyIdentifier;
            boldStyle: DataViewObjectPropertyIdentifier;
            italicStyle: DataViewObjectPropertyIdentifier;
            underline: DataViewObjectPropertyIdentifier;
            overline: DataViewObjectPropertyIdentifier;
            strikeThrough: DataViewObjectPropertyIdentifier;
        }
    };

    questTextProperties = {
        dynamicSettings: {
            backgroundColor: <DataViewObjectPropertyIdentifier>{ objectName: "Settings", propertyName: "backgroundColor" },
            boldStyle: <DataViewObjectPropertyIdentifier>{ objectName: "Settings", propertyName: "boldStyle" },
            fontFamily: <DataViewObjectPropertyIdentifier>{ objectName: "Settings", propertyName: "fontFamily" },
            fontWeight: <DataViewObjectPropertyIdentifier>{ objectName: "Settings", propertyName: "fontWeight" },
            italicStyle: <DataViewObjectPropertyIdentifier>{ objectName: "Settings", propertyName: "italicStyle" },
            overline: <DataViewObjectPropertyIdentifier>{ objectName: "Settings", propertyName: "overline" },
            strikeThrough: <DataViewObjectPropertyIdentifier>{ objectName: "Settings", propertyName: "strikeThrough" },
            textDecoration: <DataViewObjectPropertyIdentifier>{ objectName: "Settings", propertyName: "textDecoration" },
            textShadow: <DataViewObjectPropertyIdentifier>{ objectName: "Settings", propertyName: "textShadow" },
            textShadowBlur: <DataViewObjectPropertyIdentifier>{ objectName: "Settings", propertyName: "textShadowBlur" },
            textShadowColor: <DataViewObjectPropertyIdentifier>{ objectName: "Settings", propertyName: "textShadowColor" },
            textTransform: <DataViewObjectPropertyIdentifier>{ objectName: "Settings", propertyName: "textTransform" },
            transparency: <DataViewObjectPropertyIdentifier>{ objectName: "Settings", propertyName: "transparency" },
            underline: <DataViewObjectPropertyIdentifier>{ objectName: "Settings", propertyName: "underline" }
        },

        staticTextSettings: {
            backgroundColor: <DataViewObjectPropertyIdentifier>{ objectName: "staticText", propertyName: "backgroundColor" },
            boldStyle: <DataViewObjectPropertyIdentifier>{ objectName: "staticText", propertyName: "boldStyle" },
            fontFamily: <DataViewObjectPropertyIdentifier>{ objectName: "staticText", propertyName: "fontFamily" },
            fontWeight: <DataViewObjectPropertyIdentifier>{ objectName: "staticText", propertyName: "fontWeight" },
            italicStyle: <DataViewObjectPropertyIdentifier>{ objectName: "staticText", propertyName: "italicStyle" },
            overline: <DataViewObjectPropertyIdentifier>{ objectName: "staticText", propertyName: "overline" },
            postText: <DataViewObjectPropertyIdentifier>{ objectName: "staticText", propertyName: "postText" },
            showColon: <DataViewObjectPropertyIdentifier>{ objectName: "staticText", propertyName: "showColon" },
            strikeThrough: <DataViewObjectPropertyIdentifier>{ objectName: "staticText", propertyName: "strikeThrough" },
            textDecoration: <DataViewObjectPropertyIdentifier>{ objectName: "staticText", propertyName: "textDecoration" },
            textPosition: <DataViewObjectPropertyIdentifier>{ objectName: "staticText", propertyName: "textPosition" },
            textShadow: <DataViewObjectPropertyIdentifier>{ objectName: "staticText", propertyName: "textShadow" },
            textShadowBlur: <DataViewObjectPropertyIdentifier>{ objectName: "staticText", propertyName: "textShadowBlur" },
            textShadowColor: <DataViewObjectPropertyIdentifier>{ objectName: "staticText", propertyName: "textShadowColor" },
            textTransform: <DataViewObjectPropertyIdentifier>{ objectName: "staticText", propertyName: "textTransform" },
            transparency: <DataViewObjectPropertyIdentifier>{ objectName: "staticText", propertyName: "transparency" },
            underline: <DataViewObjectPropertyIdentifier>{ objectName: "staticText", propertyName: "underline" }
        },
        textSettings: {
            alignment: <DataViewObjectPropertyIdentifier>{ objectName: "textSettings", propertyName: "alignment" },
            alignmentV: <DataViewObjectPropertyIdentifier>{ objectName: "textSettings", propertyName: "alignmentV" },
            color: <DataViewObjectPropertyIdentifier>{ objectName: "textSettings", propertyName: "color" },
            direction: <DataViewObjectPropertyIdentifier>{ objectName: "textSettings", propertyName: "direction" },
            fontSize: <DataViewObjectPropertyIdentifier>{ objectName: "textSettings", propertyName: "fontSize" },
            letterSpacing: <DataViewObjectPropertyIdentifier>{ objectName: "textSettings", propertyName: "letterSpacing" },
            lineHeight: <DataViewObjectPropertyIdentifier>{ objectName: "textSettings", propertyName: "lineHeight" },
            lineIndent: <DataViewObjectPropertyIdentifier>{ objectName: "textSettings", propertyName: "lineIndent" },
            perspective: <DataViewObjectPropertyIdentifier>{ objectName: "textSettings", propertyName: "perspective" },
            postText: <DataViewObjectPropertyIdentifier>{ objectName: "textSettings", propertyName: "postText" },
            skewX: <DataViewObjectPropertyIdentifier>{ objectName: "textSettings", propertyName: "skewX" },
            skewY: <DataViewObjectPropertyIdentifier>{ objectName: "textSettings", propertyName: "skewY" },
            textIndent: <DataViewObjectPropertyIdentifier>{ objectName: "textSettings", propertyName: "textIndent" },
            textRotate: <DataViewObjectPropertyIdentifier>{ objectName: "textSettings", propertyName: "textRotate" },
            transparency: <DataViewObjectPropertyIdentifier>{ objectName: "textSettings", propertyName: "transparency" },
            wordSpacing: <DataViewObjectPropertyIdentifier>{ objectName: "textSettings", propertyName: "wordSpacing" }
        },
    };

    export class TextEnhancer implements IVisual {
        private eventService: IVisualEventService;
        private target: d3.Selection<HTMLElement>;
        private dataViews: DataView;
        private staticTextSettings: IStaticTextSettings;
        private dynamicSettings: IDynamicTextSettings;
        private finalTextContainer: d3.Selection<HTMLElement>;
        private visualHost: IVisualHost;
        private transformed: string = "";
        private paddingType: string = "";
        private positionName: string = "";
        private positionVal: string = "";
        private degree360: number = 360;
        private degree180: number = 180;
        private degree90: number = 90;
        private degree270: number = 270;
        private categoriesValues;

        constructor(options: VisualConstructorOptions) {
            this.visualHost = options.host;
            this.eventService = options.host.eventService;
            this.target = d3.select(options.element);
            this.target.style({
                cursor: "default",
            });
        }

        /**
         * Method to change point to pixel
         * @param {number} pt        - variable to store points
         */
        public pointToPixel(pt: number): string {
            const pxPtRatio: number = 4 / 3;
            const pixelString: string = "px";
            return (pt * pxPtRatio) + pixelString;
        }

        /**
         * Method that sets spacing
         * @param {number} ls         - variable to set spacing
         */
        public letSpace(ls: number): string {
            const lower = -3;
            const upper = 50;
            ls = ls < lower ? lower : ls > upper ? upper : ls;
            const pixelString: string = "px";
            return ls + pixelString;
        }

        /**
         * Method that gets Line height
         * @param {number} lh        - variable that stores line height
         */
        public getLineHeight(lh: number): string {
            const defaultHeight = 1.6;
            lh = lh === (null || 0) ? defaultHeight : lh;
            const pixelString: string = "";
            return lh + pixelString;
        }

        /**
         * Method that sets word spacing
         * @param {number} ws        - variable that stores spacing between words
         */
        public getWordSpace(ws: number): string {
            const lower = -3;
            const upper = 50;
            ws = ws === null ? 0 : (ws < lower ? lower : ws > upper ? upper : ws);
            const pixelString: string = "px";
            return ws + pixelString;
        }

        /**
         * Method that sets the Lines indent
         * @param {number} ti        - variable that stores line indent
         */
        public getIndent(ti: number): string {
            const lower = -3;
            ti = ti == null ? 0 : (ti < lower ? lower : ti);
            const pixelString: string = "px";
            return ti + pixelString;
        }

        /**
         * Method that sets the Text shadow
         * @param {string} position      - variable that stores position of text
         * @param {string} blur          - variable to set the blur effect
         * @param {string} color         - variable that stores the color
         */
        public getTextShadow(position: string, blur: string, color: string): string {
            let aShadowVar: number = 0;
            let bShadowVar: number = 0;
            let cShadowVar: number = 0;
            switch (position) {
                case "none":
                    return "";
                case "topLeft":
                    aShadowVar = -2;
                    bShadowVar = -2;
                    break;
                case "topCenter":
                    aShadowVar = 0;
                    bShadowVar = -2;
                    break;
                case "topRight":
                    aShadowVar = 2;
                    bShadowVar = -2;
                    break;
                case "middleLeft":
                    aShadowVar = -2;
                    bShadowVar = 0;
                    break;
                case "middleCenter":
                    aShadowVar = 0;
                    bShadowVar = 0;
                    break;
                case "middleRight":
                    aShadowVar = 2;
                    bShadowVar = 0;
                    break;
                case "bottomLeft":
                    aShadowVar = -2;
                    bShadowVar = 2;
                    break;
                case "bottomCenter":
                    aShadowVar = 0;
                    bShadowVar = 2;
                    break;
                case "bottomRight":
                    aShadowVar = 2;
                    bShadowVar = 2;
                    break;
                default: break;
            }
            switch (blur) {
                case "low":
                    cShadowVar = 2;
                    break;
                case "medium":
                    cShadowVar = 8;
                    break;
                case "high":
                    cShadowVar = 14;
                    break;
                default: break;
            }
            const pixelString: string = "px";
            return `${aShadowVar}${pixelString} ${bShadowVar}${pixelString} ${cShadowVar}${pixelString} ${color}`;
        }

        /**
         * Method that returns perspective of the text
         * @param {number} fw        - variable that stores the perspective of the text
         */
        public getPerspective(fw: number): string {
            const pixelString: string = "px";
            return fw + pixelString;
        }

        /**
         * Method that returns skew text
         * @param {number} sk        - variable that stores the skewness value of the text
         */
        public getSkew(sk: number): string {
            sk = sk === null ? 0 : (sk > this.degree360) ? this.degree360 : sk;
            const pixelString: string = "deg";

            return sk + pixelString;
        }

        /**
         * Method that returns skewed strings
         * @param {number} sx        - variable that stores the value for the x-axis skewness parameter
         * @param {number} sy        - variable that stores the value for the y-axis skewness parameter
         */
        public getSkewString(sx: number, sy: number): string {
            return `skewX(${this.getSkew(sx)}) skewY(${this.getSkew(sy)} )`;
        }

        /**
         * Method that counts Decimal places
         * @param {any} value         - variable to store the number of decimal places
         */
        public getDecimalPlacesCount(value: any): number {
            let decimalPlaces: number = 0;
            if (value > 0) {
                const arr: string[] = value.toString().split(".");
                if (!arr[1] && parseFloat(arr[1]) > 0) {
                    decimalPlaces = arr[1].length;
                }
            }
            return decimalPlaces;
        }

        /**
         * Method to get dynamic text
         * @param {DataView} dataView          - the dataview object, which contains
         *                                      all data needed to render the visual.
         */
        public getDynamicTextValue(dataView: DataView): IDynamicTextContainer {
            let textValDynamicInput: any;
            let valueLength: number = 0;
            const categorical = dataView.categorical;
            if (dataView && categorical) {
                if (categorical.categories && categorical.categories[0] &&
                    categorical.categories[0].values) {
                    valueLength = categorical.categories[0].values.length;
                    textValDynamicInput = valueLength ? categorical.categories[0].values[0] : "(blank)";
                    if (categorical.categories[0].source && categorical.categories[0].source.format) {
                        const formatter: utils.formatting.IValueFormatter = valueFormatter.create({
                            format: categorical.categories[0].source.format });
                        textValDynamicInput = formatter.format(textValDynamicInput);
                    }
                } else if (categorical.values && categorical.values[0] &&
                    categorical.values[0].values) {
                    valueLength = categorical.values[0].values.length;
                    textValDynamicInput = categorical.values[0].values[0] ?	
                        categorical.values[0].values[0] : 0;
                    const upper = 4;
                    if (categorical.values[0] && categorical.values[0].source
                        && categorical.values[0].source.format) {
                        let decimalPlaces: number = this.getDecimalPlacesCount(textValDynamicInput);
                        decimalPlaces = decimalPlaces > upper ? upper : decimalPlaces;
                        const formatter: utils.formatting.IValueFormatter = valueFormatter.create({
                            format: categorical.values[0].source.format, precision: decimalPlaces, value: 1 });
                        textValDynamicInput = formatter.format(textValDynamicInput);
                    }
                }
                return {
                    lengthContainer: valueLength,
                    textContainer: textValDynamicInput };
            }
        }

        /**
         * Method to get Font style
         * @param {IDynamicTextSettings | IStaticTextSettings} settings      - variable that stores the
         *                                      different configurations that are available on the text
         */
        public getFontStyleClassName(settings: IDynamicTextSettings | IStaticTextSettings): string {
            let fontStyleClassName: string = "";
            if (settings.italicStyle) {
                fontStyleClassName = "tw_italic";
            }
            return fontStyleClassName;
        }

        /**
         * Method to get Text decoration
         * @param {IDynamicTextSettings | IStaticTextSettings} settings      - variable that stores the
         *                                      different configurations that are available on the text
         */
        public getTextDecoration(settings: IDynamicTextSettings | IStaticTextSettings): string {
            let textDecorationName: string = "";
            if (settings.underline) {
                textDecorationName += "underline ";
            }
            if (settings.overline) {
                textDecorationName += "overline ";
            }
            if (settings.strikeThrough) {
                textDecorationName += "line-through ";
            }
            return textDecorationName;
        }

        /**
         * Method to convert Hex to rgb
         * @param {string} hex               - Variable that stores any hexadecimals
         */
        public convertHex(hex: string): string {
            hex = hex.replace("#", "");
            const rHexString: number = parseInt(hex.substring(0, 2), 16);
            const gHexString: number = parseInt(hex.substring(2, 4), 16);
            const bHexString: number = parseInt(hex.substring(4, 6), 16);
            return `rgb(${rHexString},${gHexString},${bHexString})`;
        }

        /**
         * Method to get the opacity value
         * @param {number} transparency      -  variable that stores the opacity value of the text
         */
        public getOpacityHex(transparency: number): string {
            const upper = 100;
            const max = 255;
            const lower = 6;
            const limit = 16;
            transparency = (upper - transparency);
            if (transparency === upper) {
                return "";
            } else {
                return transparency <= lower ? `0${Math.round((transparency / upper) * max).toString(limit).toUpperCase()}` :
                    Math.round((transparency / upper) * max).toString(limit).toUpperCase();
            }
        }

        /**
         * Method to convert into radians
         * @param {number} angle             - variable that stores the angle value that will be converted
         */
        public toRadians(angle: number): number {
            return angle * (Math.PI / this.degree180);
        }

        /**
         * Method that returns Font weight
         * @param {IDynamicTextSettings | IStaticTextSettings} settings          - variable that stores the
         *                                          different configurations that are available on the text
         */
        public getFontWeight(settings: IDynamicTextSettings | IStaticTextSettings): string {
            if (settings.boldStyle) {
                return "bold";
            } else {
                return "normal";
            }
        }

        /**
         * Method that returns Text Transform
         * @param {IDynamicTextSettings | IStaticTextSettings} settings          - variable that stores the
         *                                          different configurations that are available on the text
         */
        public getTextTransform(settings: IDynamicTextSettings | IStaticTextSettings): string {
            return settings.textTransform;
        }

        /**
         * Method to set top values for text
         * @param {ITextSettings} textSettings      - variable that stores the different
         *                                            configurations that are available on the text
         * @param {number} translate1               - first transformed text
         * @param {number} translate2               - second transformed text
         * @param {string} padding1                 - padding when line indent is greater than zero
         * @param {string} padding2                 - padding when line indent is not greater than zero
         * @param {string} positionName             - variable to store the position name of the text
         * @param {number} positionVal              - variable to store the position value of the text
         */
        public textSettingsTopValues(
            textSettings: ITextSettings,
            translate1: number,
            translate2: number,
            padding1: string,
            padding2: string,
            positionName: string,
            positionVal: number): void {
            const propVal: string = this.finalTextContainer.style("transform");
            this.transformed = `${propVal} translate(` + translate1 + `%, ` + translate2 + `%)`;
            this.paddingType = textSettings.lineIndent >= 0 ? padding1 : padding2;
            this.positionName = positionName;
            this.positionVal = positionVal + "%";
        }

        /**
         * Method to set text when direction is horizontal
         * @param {ITextSettings} textSettings      - variable that stores the different
         *                                            configurations that are available on the text
         */
        public textSettingsHorizontal(textSettings) {
            if (textSettings.alignment === "right") {
                this.finalTextContainer.style("float", "right");
            } else if (textSettings.alignment === "center") {
                this.finalTextContainer.style("width", "");
            }
        }

        /**
         * Method to set top text when direction is vertical
         * @param caseVertical             - variable to check if case is right to left or left to right
         * @param textSettings             - variable that stores the different
         *                                   configurations that are available on the text
         * @param lower                    - variable to set lower space
         * @param upper                    - variable to set upper space
         */
        public textSettingsVerticalTop(caseVertical, textSettings, lower, upper) {
            if (caseVertical === "vertical-rl") {
                if (textSettings.alignment === "center") {
                    this.textSettingsTopValues(textSettings, lower.left, 0,
                        "padding-right", "padding-left", "left", upper.left);
                } else if (textSettings.alignment === "right") {
                    this.textSettingsTopValues(textSettings, lower.right, 0,
                        "padding-right", "padding-left", "left", upper.right);
                } else if (textSettings.alignment === "left") {
                    this.textSettingsTopValues(textSettings, 0, 0, "padding-right", "padding-left", "top", 0);
                }
            } else if (caseVertical === "vertical-lr") {
                if (textSettings.alignment === "center") {
                    this.textSettingsTopValues(textSettings, lower, 0, "padding-left", "padding-right", "left", lower);
                } else if (textSettings.alignment === "right") {
                    this.textSettingsTopValues(textSettings, upper, 0, "padding-left", "padding-right", "left", upper);
                } else if (textSettings.alignment === "left") {
                    this.textSettingsTopValues(textSettings, 0, 0, "padding-left", "padding-right", "top", 0);
                }
            }
        }

        /**
         * Method to set top text
         * @param {ITextSettings} textSettings      - variable that stores the different
         *                                            configurations that are available on the text
         */
        public textSettingsTop(textSettings: ITextSettings): void {
            const paddingVal: number = textSettings.lineIndent >= 0 ?
                textSettings.lineIndent : (-textSettings.lineIndent);
            let caseVertical: string = "";
            switch (textSettings.direction) {
                case "horizontal-tb": {
                    this.textSettingsTopValues(textSettings, 0, 0, "padding-top", "padding-bottom", "top", 0);
                    this.textSettingsHorizontal(textSettings);
                }
                                      break;
                case "horizontal-bt": {
                    this.textSettingsTopValues(textSettings, 0, 0, "padding-bottom", "padding-top", "top", 0);
                    this.textSettingsHorizontal(textSettings);
                }
                                      break;
                case "vertical-rl": {
                    const lower = { left: -50, right: -100 };
                    const upper = { left: 50, right: 100 };
                    caseVertical = "vertical-rl";
                    this.textSettingsVerticalTop(caseVertical, textSettings, lower, upper);
                }
                                    break;
                case "vertical-lr": {
                    const upper = 100;
                    const lower = 50;
                    caseVertical = "vertical-lr";
                    this.textSettingsVerticalTop(caseVertical, textSettings, lower, upper);
                }
                                    break;
                default: break;
            }
            this.finalTextContainer = this.finalTextContainer
                .style("position", "relative")
                .style("transform", this.transformed)
                .style(this.positionName, this.positionVal)
                .style(this.paddingType, this.getIndent(paddingVal));
            this.finalTextContainer = this.finalTextContainer.append("div").classed("tw_pers", true);
        }

        /**
         * Method to set middle text when direction is vertical
         * @param caseVertical              - variable to check if case is right to left or left to right
         * @param textSettings              - variable that stores the different
         *                                    configurations that are available on the text
         * @param transformed               - variable that stores the transformed text
         * @param propVal                   - variable to store the property value
         * @param paddingType               - variable that stores the padding type value
         */
        public textSettingsVerticalMiddle(caseVertical, textSettings, propVal, paddingType) {
            let transformed;
            if (textSettings.alignment === "center") {
                transformed = caseVertical === "vertical-rl" ? `${propVal}  translate(-50%, -50%)`
                                                             : `${propVal}  translate(50%, 50%)`;
                paddingType = caseVertical === "vertical-rl" ? textSettings.lineIndent >= 0 ?
                "padding-right" : "padding-left" : textSettings.lineIndent >= 0 ?
                "padding-left" : "padding-right";
                this.finalTextContainer = this.finalTextContainer
                    .style("left", "50%");
            } else if (textSettings.alignment === "right") {
                transformed = caseVertical === "vertical-rl" ? `${propVal}  translate(-100%, -50%)`
                                                             : `${propVal}  translate(100%, 50%)`;
                paddingType = caseVertical === "vertical-rl" ? textSettings.lineIndent >= 0 ?
                "padding-right" : "padding-left" : textSettings.lineIndent >= 0 ?
                "padding-left" : "padding-right";
                this.finalTextContainer = this.finalTextContainer
                    .style("left", "100%");
            } else if (textSettings.alignment === "left") {
                transformed = caseVertical === "vertical-rl" ? `${propVal}  translate(0%, -50%)`
                                                             : `${propVal}  translate(0%, 50%)`;
                paddingType = caseVertical === "vertical-rl" ? textSettings.lineIndent >= 0 ?
                "padding-right" : "padding-left" : textSettings.lineIndent >= 0 ?
                "padding-left" : "padding-right";
            }
            return [transformed, paddingType];
        }

        /**
         * Method to set middle text
         * @param {ITextSettings} textSettings      - variable that stores the different
         *                                            configurations that are available on the text
         */
        public textSettingsMiddle(textSettings: ITextSettings): void {
            const paddingVal: number = textSettings.lineIndent >= 0 ?
                textSettings.lineIndent : (-textSettings.lineIndent);
            let transformed: string = "";
            let paddingType: string = "";
            let positionName: string = "";
            let positionVal: string = "";
            const propVal: string = this.finalTextContainer.style("transform");
            positionName = "top";
            positionVal = "50%";
            switch (textSettings.direction) {
                case "horizontal-tb": {
                    transformed = `${propVal}  translate(0%, -50%)`;
                    paddingType = textSettings.lineIndent >= 0 ?
                        "padding-top" : "padding-bottom";
                    this.textSettingsHorizontal(textSettings);
                }
                                      break;
                case "horizontal-bt": {
                    transformed = `${propVal}  translate(0%, 50%)`;
                    paddingType = textSettings.lineIndent >= 0 ?
                        "padding-bottom" : "padding-top";
                    this.textSettingsHorizontal(textSettings);
                }
                                      break;
                case "vertical-rl": {
                    let properties;
                    properties = this.textSettingsVerticalMiddle("vertical-rl", textSettings, propVal, paddingType);
                    transformed = properties[0];
                    paddingType = properties[1];
                }
                                    break;
                case "vertical-lr": {
                    let properties;
                    properties = this.textSettingsVerticalMiddle("vertical-lr", textSettings, propVal, paddingType);
                    transformed = properties[0];
                    paddingType = properties[1];
                }
                                    break;
                default: break;
            }
            this.finalTextContainer = this.finalTextContainer
                .style("position", "relative")
                .style("transform", transformed)
                .style(positionName, positionVal)
                .style(paddingType, this.getIndent(paddingVal));
            this.finalTextContainer = this.finalTextContainer.append("div").classed("tw_pers", true);
        }

        /**
         * Method to set bottom text when direction is vertical
         * @param caseVertical              - variable to check if case is right to left or left to right
         * @param textSettings              - variable that stores the different
         *                                    configurations that are available on the text
         * @param transformed               - variable that stores the transformed text
         * @param propVal                   - variable to store the property value
         * @param paddingType               - variable that stores the padding type value
         */
        public textSettingsVerticalBottom(caseVertical, textSettings, propVal, paddingType) {
            let transformed;
            if (textSettings.alignment === "center") {
                transformed = caseVertical === "vertical-rl" ? `${propVal}  translate(-50%, -100%)`
                                                             : `${propVal}  translate(50%, 100%)`;
                paddingType = caseVertical === "vertical-rl" ? textSettings.lineIndent >= 0 ?
                    "padding-right" : "padding-left" : textSettings.lineIndent >= 0 ?
                    "padding-left" : "padding-right";
                this.finalTextContainer = this.finalTextContainer
                    .style("left", "50%");
            } else if (textSettings.alignment === "right") {
                transformed = caseVertical === "vertical-rl" ? `${propVal}  translate(-100%, -100%)`
                                                             : `${propVal}  translate(100%, 100%)`;
                paddingType = caseVertical === "vertical-rl" ? textSettings.lineIndent >= 0 ?
                    "padding-right" : "padding-left" : textSettings.lineIndent >= 0 ?
                    "padding-left" : "padding-right";
                this.finalTextContainer = this.finalTextContainer
                    .style("left", "100%");
            } else if (textSettings.alignment === "left") {
                transformed = caseVertical === "vertical-rl" ? `${propVal}  translate(0%, -100%)`
                                                             : `${propVal}  translate(0%, 100%)`;
                paddingType = caseVertical === "vertical-rl" ? textSettings.lineIndent >= 0 ?
                    "padding-right" : "padding-left" : textSettings.lineIndent >= 0 ?
                    "padding-left" : "padding-right";
            }
            return [transformed, paddingType];
        }

        /**
         * Method to set bottom text
         * @param {ITextSettings} textSettings      - variable that stores the different
         *                                            configurations that are available on the text
         */
        public textSettingsBottom(textSettings: ITextSettings): void {
            const paddingVal: number = textSettings.lineIndent >= 0 ?
                textSettings.lineIndent : (-textSettings.lineIndent);
            let transformed: string = "";
            let paddingType: string = "";
            let positionName: string = "";
            let positionVal: string = "";
            let caseVertical: string = "";
            const propVal: string = this.finalTextContainer.style("transform");
            positionName = "top";
            positionVal = "100%";
            switch (textSettings.direction) {
                case "horizontal-tb": {
                    transformed = `${propVal}  translate(0%, -100%)`;
                    paddingType = textSettings.lineIndent >= 0 ?
                        "padding-top" : "padding-bottom";
                    this.textSettingsHorizontal(textSettings);
                }
                                      break;
                case "horizontal-bt": {
                    transformed = `${propVal}  translate(0%, 100%)`;
                    paddingType = textSettings.lineIndent >= 0 ?
                        "padding-bottom" : "padding-top";
                    this.textSettingsHorizontal(textSettings);
                }
                                      break;
                case "vertical-rl": {
                    caseVertical = "vertical-rl";
                    let properties;
                    properties = this.textSettingsVerticalBottom(caseVertical, textSettings, propVal, paddingType);
                    transformed = properties[0];
                    paddingType = properties[1];
                }
                                    break;
                case "vertical-lr": {
                    caseVertical = "vertical-lr";
                    let properties;
                    properties = this.textSettingsVerticalBottom(caseVertical, textSettings, propVal, paddingType);
                    transformed = properties[0];
                    paddingType = properties[1];
                }
                                    break;
                default: break;
            }
            this.finalTextContainer = this.finalTextContainer
                .style("position", "relative")
                .style("transform", transformed)
                .style(positionName, positionVal)
                .style(paddingType, this.getIndent(paddingVal));
            this.finalTextContainer = this.finalTextContainer.append("div").classed("tw_pers", true);
        }

        /**
         * Method to set text
         * @param {ITextSettings} textSettings      - variable that stores the different
         *                                            configurations that are available on the text
         */
        public textSettings(textSettings: ITextSettings): void {
            switch (textSettings.alignmentV) {
                case "top": {
                    this.textSettingsTop(textSettings);
                }
                            break;
                case "middle": {
                    this.textSettingsMiddle(textSettings);
                }
                               break;
                case "bottom": {
                    this.textSettingsBottom(textSettings);
                }
                               break;
                default: break;
            }
        }

        /**
         * Method to handle height issues in text
         * @param {VisualUpdateOptions} options   - Contains references to the size of the container & the
         *                                          dataView which contains all the data the visual had queried.
         * @param {JQuery<HTMLElement>} dynamicText     - Variable that stores the dynamically updated text
         * @param {any} url            - variables that stores the url that will be opened on click
         * @param {number} valueLength          - Variable to store the length
         * @param {ITextSettings} textSettings      - variable that stores the different
         *                                            configurations that are available on the text
         */
        public handleHeightIssue(
            options: VisualUpdateOptions,
            dynamicText: JQuery<HTMLElement>,
            url: any,
            valueLength: number,
            textSettings: ITextSettings): void {
            const upper = 100;
            const pers: number = textSettings.perspective > 0 ? upper - textSettings.perspective + 1 : 0;
            if (textSettings.direction === "vertical-lr" || textSettings.direction === "vertical-rl") {
                this.finalTextContainer.style("max-height", `${$("#sandbox-host").height()}px`);
            } else if (textSettings.direction === "horizontal-tb" || textSettings.direction === "horizontal-bt") {
                this.finalTextContainer.style("max-width", `${$("#sandbox-host").width()}px`);
            }
            if (valueLength === 1) {
                let transformedVal: string = "";
                if (pers === null || pers === 0) {
                    d3.select(".tw_finalText").style("perspective", "none");
                } else {
                    d3.select(".tw_finalText")
                        .style("perspective", this.getPerspective(pers))
                        .style("perspective-origin", "center")
                        .attr("overflow-x", "visible");
                    if (textSettings.direction === "vertical-rl" || textSettings.direction === "vertical-lr") {
                        transformedVal = "rotateY(25deg)";
                    } else {
                        transformedVal = "rotateX(25deg)";
                    }
                }
                d3.select(".tw_pers").style("transform", transformedVal);
            }
            // Below Two lines are to handle height issue of div in edge
            const dataView: DataView = this.dataViews = options.dataViews[0];
            const categorydata = dataView.categorical;
            const spanHeight: number = dynamicText.height();
            $(".tw_value.tw_finalText").height(spanHeight + 2);
            if(categorydata.categories !== undefined)
            {
                for (const jIterator of this.categoriesValues) {
                    if (jIterator.source.type[`category`] === "WebUrl" && jIterator.source.roles.URL) {
                        dynamicText.on("click", (): void => {
                            this.visualHost.launchUrl(url);
                        });
                        dynamicText.addClass("urlIcon");
                    }
                }
            }
            if(categorydata.values !== undefined)
            {
                for (const jIterator of categorydata.values) {
                    if (jIterator.source.type[`category`] === "WebUrl" && jIterator.source.roles.URL) {
                        dynamicText.on("click", (): void => {
                            this.visualHost.launchUrl(url);
                        });
                        dynamicText.addClass("urlIcon");
                    }
                }
            }
        }

        /**
         * Method to order the text
         * @param {string} textValStatic   - variable that stores the value of static text
         * @param {string} textValDynamic  - variable that stores the value of dynamic text
         * @param {number} textFontSize    - variable that stores the font size of the text
         * @param {DataView} dataView      - the dataview object, which contains all data needed to render the visual.
         */
        public textOrdering(
            textValStatic: string,
            textValDynamic: string,
            textFontSize: number,
            dataView: DataView): void {
            const dynFontStyleClass: string = this.getFontStyleClassName(this.dynamicSettings);
            const dynTextDecoration: string = this.getTextDecoration(this.dynamicSettings);
            const dynTextShadow: string = this.getDynamicTextSettings(dataView).textShadow;
            const dynTextShadowBlur: string = this.getDynamicTextSettings(dataView).textShadowBlur;
            const dynTextShadowColor: string = this.getDynamicTextSettings(dataView).textShadowColor;
            const staticFontStyleClass: string = this.getFontStyleClassName(this.staticTextSettings);
            const staticTextDecoration: string = this.getTextDecoration(this.staticTextSettings);
            const staticTextShadow: string = this.getStaticTextSettings(dataView).textShadow;
            const staticTextShadowBlur: string = this.getStaticTextSettings(dataView).textShadowBlur;
            const staticTextShadowColor: string = this.getStaticTextSettings(dataView).textShadowColor;
            const staticFontWgt: string = this.getFontWeight(this.staticTextSettings);
            const textTrans: string = this.getTextTransform(this.staticTextSettings);
            const staticTextFontFamily: string = this.staticTextSettings.fontFamily;
            const textTransD: string = this.getTextTransform(this.dynamicSettings);
            const dynFontWgt: string = this.getFontWeight(this.dynamicSettings);
            const dynamicTextFontFamily: string = this.dynamicSettings.fontFamily;
            const colonText: string = " : ";
            if (textValStatic !== "" && this.staticTextSettings.showColon) {
                if (this.staticTextSettings.textPosition === "suffix") {
                    this.getText(textValDynamic, dynFontStyleClass, dynTextDecoration,
                        textFontSize, dynTextShadow, dynTextShadowBlur,
                        dynTextShadowColor, dynamicTextFontFamily,
                        this.dynamicSettings.backgroundColor, dynFontWgt, textTransD);
                    this.colonText(colonText);
                    this.getTexts(textValStatic, staticFontStyleClass,
                        staticTextDecoration, textFontSize, staticTextFontFamily,
                        this.staticTextSettings.backgroundColor, textTrans,
                        staticTextShadow, staticTextShadowBlur,
                        staticTextShadowColor, staticFontWgt);
                    if (this.dynamicSettings.italicStyle) {
                        $(".dynamicpluscolon").css("padding-left", "4px");
                    }
                } else {
                    this.getTexts(textValStatic, staticFontStyleClass, staticTextDecoration,
                        textFontSize, staticTextFontFamily, this.staticTextSettings.backgroundColor,
                        textTrans, staticTextShadow, staticTextShadowBlur, staticTextShadowColor, staticFontWgt);
                    this.colonText(colonText);
                    this.getText(textValDynamic, dynFontStyleClass, dynTextDecoration, textFontSize,
                        dynTextShadow, dynTextShadowBlur, dynTextShadowColor, dynamicTextFontFamily,
                        this.dynamicSettings.backgroundColor, dynFontWgt, textTransD);
                    if (this.staticTextSettings.italicStyle) {
                        $(".dynamicpluscolon").css("padding-left", "4px");
                    }
                }
            } else if (textValStatic !== "" && !this.staticTextSettings.showColon) {
                if (this.staticTextSettings.textPosition === "suffix") {
                    this.getText(textValDynamic, dynFontStyleClass, dynTextDecoration, textFontSize, dynTextShadow,
                        dynTextShadowBlur, dynTextShadowColor, dynamicTextFontFamily,
                        this.dynamicSettings.backgroundColor, dynFontWgt, textTransD);
                    this.addSpace();
                    this.getTexts(textValStatic, staticFontStyleClass, staticTextDecoration, textFontSize,
                        staticTextFontFamily, this.staticTextSettings.backgroundColor, textTrans, staticTextShadow,
                        staticTextShadowBlur, staticTextShadowColor, staticFontWgt);
                } else {
                    this.getTexts(textValStatic, staticFontStyleClass, staticTextDecoration, textFontSize,
                        staticTextFontFamily, this.staticTextSettings.backgroundColor, textTrans, staticTextShadow,
                        staticTextShadowBlur, staticTextShadowColor, staticFontWgt);
                    this.addSpace();
                    this.getText(textValDynamic, dynFontStyleClass, dynTextDecoration, textFontSize,
                        dynTextShadow, dynTextShadowBlur, dynTextShadowColor, dynamicTextFontFamily,
                        this.dynamicSettings.backgroundColor, dynFontWgt, textTransD);
                }
            } else if (textValStatic === "") {
                this.getText(textValDynamic, dynFontStyleClass, dynTextDecoration, textFontSize, dynTextShadow,
                    dynTextShadowBlur, dynTextShadowColor,
                    dynamicTextFontFamily, this.dynamicSettings.backgroundColor,
                    dynFontWgt, textTransD);
            }
        }

        /**
         * Method that updates the dataviews and render the visual
         * @param {VisualUpdateOptions} options       - Contains references to the size of the container and
         *                                              the dataView which contains all the data the visual had queried.
         */
        public update(options: VisualUpdateOptions): void {
            try {
                this.eventService.renderingStarted(options);
                this.target.selectAll(".tw_value").remove();
                const dataView: DataView = this.dataViews = options.dataViews[0];
                let valueLength: number = 0;
                const textSettings: ITextSettings = this.getTextSettings(dataView);
                this.dynamicSettings = this.getDynamicTextSettings(dataView);
                this.staticTextSettings = this.getStaticTextSettings(dataView);
                const textValStaticInput: string = this.staticTextSettings.postText;
                this.staticTextSettings.postText = textValStaticInput;
                const valuesContainer: IDynamicTextContainer = this.getDynamicTextValue(dataView);
                const textValDynamicInput: string = valuesContainer.textContainer;
                const textFontSize: number = textSettings.fontSize;
                const letSpacing: number = textSettings.letterSpacing;
                const wordSpace: number = textSettings.wordSpacing;
                const lHeight: number = textSettings.lineHeight;
                const indent: number = textSettings.textIndent;
                let textRotationVal: number = textSettings.textRotate === null ? 0 : textSettings.textRotate;
                const textSkewX: number = textSettings.skewX, textSkewY: number = textSettings.skewY;
                let textValStatic: string = "", textValDynamic: string = "";
                valueLength = valuesContainer.lengthContainer;
                if (valueLength === 1) { // Text Formatting
                    this.target.append("div")
                        .classed("tw_value tw_finalText", true)
                        .style("font-size", this.pointToPixel(textFontSize))
                        .style("letter-spacing", this.letSpace(letSpacing))
                        .style("word-spacing", this.getWordSpace(wordSpace))
                        .style("line-height", this.getLineHeight(lHeight))
                        .style("text-indent", this.getIndent(indent))
                        .style("color", textSettings.color + this.getOpacityHex(textSettings.transparency == null ? 0 : textSettings.transparency))
                        .style("transform", this.getSkewString(textSkewX, textSkewY)).style("width", "fit-content");
                    textValStatic = textValStaticInput;
                    textValDynamic = textValDynamicInput;
                } else {
                    let errMsg: string = "";
                    if (valueLength > 1) {
                        errMsg = "Query returned more than one row, please filter data to return one row";
                    } else if (valueLength === 0) {
                        errMsg = "Query contains null value";
                    }
                    this.target.append("div")
                        .classed("tw_value errormsg", true).text(errMsg).attr("title", errMsg)
                        .style("font-size", this.pointToPixel(textFontSize))
                        .style("letter-spacing", this.letSpace(letSpacing))
                        .style("word-spacing", this.getWordSpace(wordSpace))
                        .style("line-height", this.getLineHeight(lHeight))
                        .style("font-family", "Segoe UI Semibold")
                        .style("color", "#777")
                        .style("transform", this.getSkewString(textSkewX, textSkewY));
                }
                let url;
                const categoricalValues = options.dataViews[0].categorical;
                if (categoricalValues.categories !== undefined) {
                    this.categoriesValues = options.dataViews[0].categorical.categories;
                }
                if (dataView.categorical.categories !== undefined) { // To check if url field exists
                    for (const iterator of this.categoriesValues) {
                        if (iterator.source.type[`category`] === "WebUrl" && iterator.source.roles.URL) {
                            url = (iterator.values.toString());
                        }
                    }
                } 
                if (dataView.categorical.values !== undefined) { // To check if url field exists
                    for (const iterator of dataView.categorical.values) {
                        if (iterator.source.type[`category`] === "WebUrl" && iterator.source.roles.URL) {
                            url = (iterator.values.toString());
                        }
                    }
                } 
                // Text Direction
                let textAlign: string = textSettings.alignment, writingMode: string = textSettings.direction;
                switch (textSettings.direction) {
                    case "vertical-lr":
                        textRotationVal = this.degree180 + textRotationVal; writingMode = "tb-rl";
                        break;
                    case "vertical-rl":
                        writingMode = "tb-rl"; break;
                    case "horizontal-bt":
                        textRotationVal = this.degree180 + textRotationVal;
                        textAlign = textAlign === "left" ? "right" : (textAlign === "right" ? "left" : "center");
                        writingMode = "horizontal-tb"; break;
                    default: break;
                }
                const element: string = d3.select(".tw_finalText").style("transform");
                const newTransform: string = `${element} rotate(${textRotationVal}deg)`;
                this.finalTextContainer = d3.select(".tw_finalText")
                    .style("text-align", textAlign).style("writing-mode", writingMode).style("transform", newTransform);
                this.textSettings(textSettings); // Vertical Alignment & Line Indentation
                this.textOrdering(textValStatic, textValDynamic, textFontSize, dataView); // Text Ordering
                const dynamicText = $(".dynamicText");
                const twFinalText = $(".tw_finalText");
                this.textOverflow(textRotationVal, textSettings, dynamicText, twFinalText); // Text Overflow Handling
                this.handleHeightIssue(options, dynamicText, url, valueLength, textSettings); // Applying Perpective
                this.eventService.renderingFinished(options);
            } catch (exception) {
                this.eventService.renderingFailed(options, exception);
            }
        }

        /**
         * Method to handle text overflow for left and right cases of middle text in right to left direction
         * @param rotVal            - variable to store value of rotation
         * @param marginT           - variable that stores the value of margin top
         * @param textHeight        - variable to store text height
         * @param marginL           - variable that stores the value of margin left
         * @param buffer            - variable the stores the value to be differentiated from left margin
         * @param rotValGreater     - variable that stores different values based on LR to compare for rotation val
         * @param rotValLesser      - variable that stores different values based on LR to compare for rotation val
         */
        public textOverflowHandlerMiddleRL(rotVal, marginT, textHeight, marginL, buffer, rotValGreater, rotValLesser) {
            if (rotVal > 0 && rotVal <= this.degree90) {
                const rotationHeight: number = Math.sin(this.toRadians(this.degree90 - rotVal));
                marginT = ((textHeight - textHeight * rotationHeight) / 2);
            } else if (rotVal > this.degree90 && rotVal <= this.degree270) {
                const rotationHeight: number = Math.sin(this.toRadians(rotVal - this.degree90));
                marginT = ((textHeight + textHeight * rotationHeight) / 2);
            } else if (rotVal > this.degree270 && rotVal < this.degree360) {
                const rotationHeight: number = Math
                    .sin(this.toRadians(rotVal % this.degree270));
                marginT = ((textHeight - textHeight * rotationHeight) / 2);
            }
            if (rotVal > rotValGreater && rotVal < rotValLesser) {
                const rotationHeight: number = -Math.sin(this.toRadians(rotVal));
                marginL = textHeight * rotationHeight;
            }
            this.finalTextContainer.style("margin-top", `${-marginT}px`);
            this.finalTextContainer.style("margin-left", `${marginL - buffer}px`);
        }

        /**
         * Method to handle text overflow of middle RL
         * @param {number} textRotationVal          - Variable to store the rotational value of the text
         * @param {ITextSettings} textSettings      - variable that stores the different
         *                                            configurations that are available on the text
         * @param {number} textHeight        - variable that stores the text height
         * @param {number} textWidth         - variable that stores the text width
         */
        public textOverflowMiddleRL(
            textRotationVal: number,
            textSettings: ITextSettings,
            textHeight: number,
            textWidth: number): void {
            let marginT: number = 0;
            let marginL: number = 0;
            let buffer: number = 0;
            let rotVal: number = textRotationVal > 0 ? textRotationVal : -textRotationVal;
            const upper = 100;
            let rotValGreater: number;
            let rotValLesser: number;
            rotVal = rotVal % this.degree360;
            if (rotVal < this.degree180) {
                buffer = (rotVal / upper * 2) * textWidth;
            } else {
                buffer = ((this.degree360 - rotVal) / upper * 2) * textWidth;
            }
            switch (textSettings.alignment) {
                case "left": {
                    rotValGreater = this.degree180;
                    rotValLesser = this.degree360;
                    this.textOverflowHandlerMiddleRL(rotVal, marginT, textHeight,
                        marginL, buffer, rotValGreater, rotValLesser);
                }
                             break;
                case "right": {
                    rotValGreater = 0;
                    rotValLesser = this.degree180;
                    this.textOverflowHandlerMiddleRL(rotVal, marginT, textHeight,
                        marginL, buffer, rotValGreater, rotValLesser);
                }
                              break;
                case "center": {
                    if (rotVal > 0 && rotVal <= this.degree90) {
                        const rotationHeight: number = Math.sin(this.toRadians(this.degree90 - rotVal));
                        marginT = ((textHeight - textHeight * rotationHeight) / 2);
                    } else if (rotVal > this.degree90 && rotVal <= this.degree270) {
                        const rotationHeight: number = Math.sin(this.toRadians(rotVal - this.degree90));
                        marginT = ((textHeight + textHeight * rotationHeight) / 2);
                    } else if (rotVal > this.degree270 && rotVal < this.degree360) {
                        const rotationHeight: number = Math.sin(this.toRadians(rotVal % this.degree270));
                        marginT = ((textHeight - textHeight * rotationHeight) / 2);
                    }
                    let rotValHeight: number = Math.sin(this.toRadians(rotVal));
                    rotValHeight = rotValHeight > 0 ? rotValHeight : -rotValHeight;
                    marginL = (textHeight * rotValHeight) / 2;
                    this.finalTextContainer.style("margin-top", `${-marginT}px`);
                    if (rotVal < this.degree180) {
                        this.finalTextContainer.style("margin-left", `${-marginL}px`);
                    } else {
                        this.finalTextContainer.style("margin-left", `${marginL}px`);
                    }
                }
                               break;
                default: break;
            }
        }

        /**
         * Method to handle text overflow for left and right cases of middle text in left to right direction
         * @param caseLR            - variable that checks whether the case is Left or Right
         * @param rotVal            - variable to store value of rotation
         * @param marginT           - variable that stores the value of margin top
         * @param textHeight        - variable to store text height
         * @param marginL           - variable that stores the value of margin left
         * @param rotValGreater     - variable that stores different values based on LR to compare for rotation val
         * @param rotValLesser      - variable that stores different values based on LR to compare for rotation val
         * @param buffer            - variable the stores the value to be differentiated from left margin
         */
        public textOverFlowMiddleLR(caseLR, rotVal, marginT, textHeight, marginL, rotValGreater, rotValLesser, buffer) {
            if (rotVal > 0 && rotVal <= this.degree90) {
                const rotValHei: number = caseLR === "left" ?
                Math.sin(this.toRadians(this.degree90 - rotVal % this.degree90))
                : Math.sin(this.toRadians(this.degree90 - rotVal));
                marginT = ((textHeight - textHeight * rotValHei) / 2);
            } else if (rotVal > this.degree90 && rotVal <= this.degree270) {
                const rotValHei: number = Math.sin(this.toRadians(rotVal - this.degree90));
                marginT = ((textHeight + textHeight * rotValHei) / 2);
            } else if (rotVal > rotValGreater && rotVal < rotValLesser) {
                const rotValHei: number = Math.sin(this.toRadians(rotVal % this.degree270));
                marginT = ((textHeight - textHeight * rotValHei) / 2);
            }
            if (rotVal > this.degree180 && rotVal < this.degree360) {
                const rotValHei: number = -Math.sin(this.toRadians(rotVal));
                marginL = textHeight * rotValHei;
            }
            this.finalTextContainer.style("margin-top", `${-marginT}px`);
            caseLR === "left" ? this.finalTextContainer.style("margin-left", `${marginL}px`)
            : this.finalTextContainer.style("margin-left", `${(marginL - buffer)}px`);
        }

        /**
         * Method to handle the text overflow in the middle
         * @param {number} textRotationVal          - Variable to store the rotational value of the text
         * @param {ITextSettings} textSettings      - variable that stores the different
         *                                            configurations that are available on the text
         * @param {number} textHeight        - variable that stores the text height
         * @param {number} textWidth         - variable that stores the text width
         */
        public textOverflowMiddle(
            textRotationVal: number,
            textSettings: ITextSettings,
            textHeight: number,
            textWidth: number): void {
            let marginT: number = 0;
            let marginL: number = 0;
            let buffer: number = 0;
            let rotVal: number = textRotationVal > 0 ? textRotationVal : -textRotationVal;
            let rotValGreater: number;
            let rotValLesser: number;
            let caseLR: string = "";
            switch (textSettings.direction) {
                case "vertical-rl": {
                    this.textOverflowMiddleRL(textRotationVal, textSettings, textHeight, textWidth);
                }                   break;
                case "vertical-lr": {
                    rotVal = rotVal - this.degree180;
                    rotVal = rotVal % this.degree360;
                    const upper = 100;
                    if (rotVal < this.degree180) {
                        buffer = (rotVal / upper * 2) * textSettings.fontSize;
                    } else {
                        buffer = ((this.degree360 - rotVal) / upper * 2) * textSettings.fontSize;
                    }
                    switch (textSettings.alignment) {
                        case "left": {
                            rotValGreater = this.degree180;
                            rotValLesser = this.degree360;
                            caseLR = "left";
                            this.textOverFlowMiddleLR(caseLR, rotVal, marginT, textHeight,
                                marginL, rotValGreater, rotValLesser, buffer);
                        }
                                     break;
                        case "right": {
                            rotValGreater = 0;
                            rotValLesser = this.degree180;
                            caseLR = "right";
                            this.textOverFlowMiddleLR(caseLR, rotVal, marginT, textHeight,
                                marginL, rotValGreater, rotValLesser, buffer);
                        }
                                      break;
                        case "center": {
                            let rotValHei: number;
                            if (rotVal > 0 && rotVal <= this.degree90) {
                                rotValHei = Math
                                    .sin(this.toRadians(this.degree90 - rotVal % this.degree90));
                                marginT = ((textHeight - textHeight * rotValHei) / 2);
                            } else if (rotVal > this.degree90 && rotVal <= this.degree270) {
                                rotValHei = Math.sin(this.toRadians(rotVal - this.degree90));
                                marginT = ((textHeight + textHeight * rotValHei) / 2);
                            } else if (rotVal > this.degree270 && rotVal < this.degree360) {
                                rotValHei = Math.sin(this.toRadians(rotVal % this.degree270));
                                marginT = ((textHeight - textHeight * rotValHei) / 2);
                            }
                            rotValHei = Math.sin(this.toRadians(rotVal));
                            rotValHei = rotValHei > 0 ? rotValHei : -rotValHei;
                            marginL = (textHeight * rotValHei) / 2;
                            this.finalTextContainer.style("margin-top", `${-marginT}px`);
                            if (rotVal < this.degree180) {
                                this.finalTextContainer
                                    .style("margin-left", `${-marginL}px`);
                            } else {
                                this.finalTextContainer.style("margin-left", `${marginL}px`);
                            }
                        }
                                       break;
                        default: break;
                    }
                }                   break;
                default: break;
            }
        }

        /**
         * Method to handle text overflow for left and right cases of bottom text
         * @param caseLR            - variable that checks whether the case is Left or Right
         * @param rotVal            - variable to store value of rotation
         * @param marginT           - variable that stores the value of margin top
         * @param textHeight        - variable to store text height
         * @param marginL           - variable that stores the value of margin left
         * @param buffer            - variable the stores the value to be differentiated from left margin
         */
        public textOverFlowHandlerBottom(caseLR, rotVal, marginT, textHeight, marginL, buffer) {
            if (rotVal > 0 && rotVal <= this.degree90) {
                const rotValHei: number = Math.sin(this.toRadians(this.degree90 - rotVal));
                marginT = (textHeight - textHeight * rotValHei) / 2;
            } else if (rotVal > this.degree90 && rotVal <= this.degree270) {
                const rotValHei: number = Math.sin(this.toRadians(rotVal - this.degree90));
                marginT = (textHeight + textHeight * rotValHei) / 2;
            } else if (rotVal > this.degree270 && rotVal < this.degree360) {
                const rotValHei: number = Math.sin(this.toRadians(rotVal % this.degree270));
                marginT = (textHeight - textHeight * rotValHei) / 2;
            }
            if (rotVal <= this.degree180) {
                const rotValHei: number = -Math.sin(this.toRadians(rotVal % this.degree180));
                if (caseLR === "left") {
                    marginL = (textHeight * rotValHei) / 2;
                } else if (caseLR === "right") {
                    marginL = (1.5 * textHeight) * rotValHei;
                }
            } else if (rotVal > this.degree180) {
                const rotValHei: number = Math.sin(this.toRadians(rotVal % this.degree180));
                if (caseLR === "left") {
                    marginL = (1.5 * textHeight) * rotValHei;
                } else if (caseLR === "right") {
                    marginL = (textHeight * rotValHei) / 2;
                }
            }
            if (caseLR === "left") {
                this.finalTextContainer.style("margin-left", `${marginL}px`);
            } else if (caseLR === "right") {
                this.finalTextContainer
                        .style("margin-left", `${marginL - buffer}px`);
            }
        }

        /**
         * Method to handle text overflow in bottom RL
         * @param {number} textRotationVal          - Variable to store the rotational value of the text
         * @param {ITextSettings} textSettings      - variable that stores the different
         *                                            configurations that are available on the text
         * @param {number} textHeight        - variable that stores the text height
         */
        public textOverflowBottomRL(textRotationVal: number, textSettings: ITextSettings, textHeight: number): void {
            let marginT: number = 0;
            let marginL: number = 0;
            let buffer: number = 0;
            let rotVal: number = textRotationVal > 0 ? textRotationVal : -textRotationVal;
            rotVal = rotVal % this.degree360;
            const upper = 100;
            let caseLR: string = "";
            if (rotVal < this.degree180) {
                buffer = (rotVal / upper * 2) * textSettings.fontSize;
            } else {
                buffer = ((this.degree360 - rotVal) / upper * 2) * textSettings.fontSize;
            }
            switch (textSettings.alignment) {
                case "left": {
                    caseLR = "left";
                    this.textOverFlowHandlerBottom(caseLR, rotVal, marginT, textHeight, marginL, buffer);
                }
                             break;
                case "right": {
                    caseLR = "right";
                    this.textOverFlowHandlerBottom(caseLR, rotVal, marginT, textHeight, marginL, buffer);
                }
                              break;
                case "center": {
                    let rotValHei: number;
                    if (rotVal > 0 && rotVal <= this.degree90) {
                        rotValHei = Math.sin(this.toRadians(this.degree90 - rotVal));
                        marginT = (textHeight - textHeight * rotValHei) / 2;
                    } else if (rotVal > this.degree90 && rotVal <= this.degree270) {
                        rotValHei = Math.sin(this.toRadians(rotVal - this.degree90));
                        marginT = (textHeight + textHeight * rotValHei) / 2;
                    } else if (rotVal > this.degree270 && rotVal < this.degree360) {
                        rotValHei = Math.sin(this.toRadians(rotVal % this.degree270));
                        marginT = (textHeight - textHeight * rotValHei) / 2;
                    }
                    if (rotVal <= this.degree180) {
                        rotValHei = -Math.sin(this.toRadians(rotVal % this.degree180));
                        marginL = (textHeight * rotValHei) / 2;
                    } else if (rotVal > this.degree180) {
                        rotValHei = Math.sin(this.toRadians(rotVal % this.degree180));
                        marginL = (1.5 * textHeight) * rotValHei;
                    }
                    rotValHei = Math.sin(this.toRadians(rotVal));
                    rotValHei = rotValHei > 0 ? rotValHei : -rotValHei;
                    marginL = textHeight * rotValHei;
                    this.finalTextContainer
                        .style("margin-top", `${-2 * marginT}px`);
                    if (rotVal < this.degree180) {
                        this.finalTextContainer
                            .style("margin-left", `${-marginL}px`);
                    } else {
                        this.finalTextContainer
                            .style("margin-left", `${marginL}px`);
                    }
                }
                               break;
                default: break;
            }
        }

        /**
         * Method to handle text overflow in bottom LR
         * @param {number} textRotationVal          - Variable to store the rotational value of the text
         * @param {ITextSettings} textSettings      - variable that stores the different
         *                                            configurations that are available on the text
         * @param {number} textHeight       - variable that stores the text height
         */
        public textOverflowBottomLR(
            textRotationVal: number,
            textSettings: ITextSettings,
            textHeight: number): void {
            let marginT: number = 0;
            let marginL: number = 0;
            let buffer: number = 0;
            let rotVal: number = textRotationVal > 0 ? textRotationVal : -textRotationVal;
            let caseLR: string = "";
            rotVal = rotVal - this.degree180;
            rotVal = rotVal % this.degree360;
            const upper = 100;
            if (rotVal < this.degree180) {
                buffer = (rotVal / upper * 2) * textSettings.fontSize;
            } else {
                buffer = ((this.degree360 - rotVal) / upper * 2) * textSettings.fontSize;
            }
            switch (textSettings.alignment) {
                case "left": {
                    caseLR = "left";
                    this.textOverFlowHandlerBottom(rotVal, marginT, textHeight, marginL, caseLR, buffer);
                }
                             break;
                case "right": {
                    caseLR = "right";
                    this.textOverFlowHandlerBottom(rotVal, marginT, textHeight, marginL, caseLR, buffer);
                }
                              break;
                case "center": {
                    let rotValHei: number;
                    if (rotVal > 0 && rotVal <= this.degree90) {
                        rotValHei = Math.sin(this.toRadians(this.degree90 - rotVal));
                        marginT = (textHeight - textHeight * rotValHei) / 2;
                    } else if (rotVal > this.degree90 && rotVal <= this.degree270) {
                        rotValHei = Math.sin(this.toRadians(rotVal - this.degree90));
                        marginT = (textHeight + textHeight * rotValHei) / 2;

                    } else if (rotVal > this.degree270 && rotVal < this.degree360) {
                        rotValHei = Math.sin(this.toRadians(rotVal % this.degree270));
                        marginT = (textHeight - textHeight * rotValHei) / 2;
                    }
                    if (rotVal <= this.degree180) {
                        rotValHei = -Math.sin(this.toRadians(rotVal % this.degree180));
                        marginL = (textHeight * rotValHei) / 2;
                    } else if (rotVal > this.degree180) {
                        rotValHei = Math.sin(this.toRadians(rotVal % this.degree180));
                        marginL = (1.5 * textHeight) * rotValHei;
                    }
                    rotValHei = Math.sin(this.toRadians(rotVal));
                    rotValHei = rotValHei > 0 ? rotValHei : -rotValHei;
                    marginL = textHeight * rotValHei;
                    this.finalTextContainer
                        .style("margin-top", `${-2 * marginT}px`);
                    if (rotVal < this.degree180) {
                        this.finalTextContainer
                            .style("margin-left", `${-marginL}px`);
                    } else {
                        this.finalTextContainer
                            .style("margin-left", `${marginL}px`);
                    }
                }
                               break;
                default: break;
            }
        }

        /**
         * Method to handle text overflow in the bottom
         * @param {number} textRotationVal          - Variable to store the rotational value of the text
         * @param {ITextSettings} textSettings      - variable that stores the different
         *                                            configurations that are available on the text
         * @param {number} textHeight           - variable that stores the text height
         * @param {number} textWidth            - variable that stores the text width
         *                                        where text settings aligment is not centre
         * @param {number} textWidth2           - variable that stores the text width
         *                                        where text settings aligment is centre
         */
        public textOverflowBottom(
            textRotationVal: number,
            textSettings: ITextSettings,
            textHeight: number,
            textWidth: number,
            textWidth2: number): void {
            const upper = 100;
            switch (textSettings.direction) {
                case "horizontal-tb": {
                    let buffer: number = 0;
                    let rotVal: number = textRotationVal > 0 ?
                        textRotationVal : -textRotationVal;
                    textRotationVal = textRotationVal > 0 ? textRotationVal % this.degree180 :
                        (-textRotationVal) % this.degree180;
                    rotVal = rotVal % this.degree360;
                    if (rotVal < this.degree180) {
                        buffer = (rotVal / upper * 2) * textSettings.fontSize;
                    } else {
                        buffer = ((this.degree360 - rotVal) / upper * 2) * textSettings.fontSize;
                    }
                    if (textSettings.alignment !== "center") {
                        this.finalTextContainer
                            .style("margin-top", `${(-((textWidth / 2) * Math.sin(
                                this.toRadians(textRotationVal)) + buffer))}px`);
                    } else {
                        this.finalTextContainer
                            .style("margin-top", `${(-((textWidth2 / 2) * Math.sin(
                                this.toRadians(textRotationVal)) + buffer))}px`);
                    }
                }
                                      break;
                case "horizontal-bt": {
                    let buffer: number = 0;
                    textRotationVal = textRotationVal - this.degree180;
                    const rotVal: number = textRotationVal > 0 ?
                        textRotationVal : -textRotationVal;
                    textRotationVal = textRotationVal > 0 ? textRotationVal % this.degree180 :
                        (-textRotationVal) % this.degree180;
                    if (rotVal < this.degree180) {
                        buffer = (rotVal / upper * 2) * textSettings.fontSize;
                    } else {
                        buffer = ((this.degree360 - rotVal) / upper * 2) * textSettings.fontSize;
                    }

                    if (textSettings.alignment !== "center") {
                        this.finalTextContainer
                            .style("margin-top", `${(-((textWidth / 2) *
                                Math.sin(this.toRadians(textRotationVal)) + buffer))}px`);
                    } else {
                        this.finalTextContainer
                            .style("margin-top", `${(-((textWidth2 / 2) *
                                Math.sin(this.toRadians(textRotationVal)) + buffer))}px`);
                    }
                }
                                      break;
                case "vertical-rl": {
                    this.textOverflowBottomRL(textRotationVal, textSettings, textHeight);
                }                   break;
                case "vertical-lr": {
                    this.textOverflowBottomLR(textRotationVal, textSettings, textHeight);
                }                   break;
                default: break;
            }
        }

        /**
         * Method to handle text overflow
         * @param {number} textRotationVal          - Variable to store the rotational value of the text
         * @param {ITextSettings} textSettings      - variable that stores the different
         *                                            configurations that are available on the text
         * @param {JQuery<HTMLElement>} dynamicText - variable that stores the dynamic text
         * @param {JQuery<HTMLElement>} twFinalText - variable that stores the final text
         */
        public textOverflow(
            textRotationVal: number,
            textSettings: ITextSettings,
            dynamicText: JQuery<HTMLElement>,
            twFinalText: JQuery<HTMLElement>): void {
            const upper = 100;
            if (textRotationVal !== 0) {
                const textWidth: number = twFinalText.width();
                const textWidth2: number = $(".staticText").width() + dynamicText.width() + $(".dynamicpluscolon").width();
                const textHeight: number = twFinalText.height();
                switch (textSettings.alignmentV) {
                    case "top": {
                        switch (textSettings.direction) {
                            case "horizontal-tb": {
                                textRotationVal = textRotationVal > 0 ?
                                    textRotationVal % this.degree180 :
                                    (-textRotationVal) % this.degree180;
                                if (textSettings.alignment !== "center") {
                                    this.finalTextContainer.style("margin-top", `${((textWidth / 2)
                                            * Math.sin(this.toRadians(textRotationVal)))}px`);
                                } else {
                                    this.finalTextContainer.style("margin-top", `${((textWidth2 / 2)
                                            * Math.sin(this.toRadians(textRotationVal)))}px`);
                                }
                            }
                                                  break;
                            case "horizontal-bt": {
                                textRotationVal = textRotationVal > 0 ?
                                    textRotationVal % this.degree180 :
                                    (-textRotationVal) % this.degree180;
                                if (textSettings.alignment !== "center") {
                                    this.finalTextContainer.style("margin-top",
                                        `${((textWidth / 2) * Math.sin(this.toRadians(textRotationVal)))}px`);
                                } else {
                                    this.finalTextContainer.style("margin-top", `${((textWidth2 / 2)
                                            * Math.sin(this.toRadians(textRotationVal)))}px`);
                                }
                            }
                                                  break;
                            case "vertical-rl": {
                                let buffer: number = 0;
                                let rotVal: number = textRotationVal > 0 ? textRotationVal : -textRotationVal;
                                textRotationVal = textRotationVal > 0 ?
                                    textRotationVal % this.degree180 : (-textRotationVal) % this.degree180;
                                rotVal = rotVal % this.degree360;
                                if (rotVal < this.degree180) {
                                    buffer = (rotVal / upper * 2) * textSettings.fontSize;
                                } else {
                                    buffer = ((this.degree360 - rotVal) / upper * 2) * textSettings.fontSize;
                                }
                                if (textSettings.alignment === "left") {
                                    this.finalTextContainer.style("margin-left", `${((textHeight / 2)
                                            * Math.sin(this.toRadians(textRotationVal)))}px`);
                                } else if (textSettings.alignment === "right") {
                                    this.finalTextContainer.style("margin-left", `${-((textHeight / 2) *
                                            Math.sin(this.toRadians(textRotationVal)) + buffer)}px`);
                                }
                            }
                                                break;
                            case "vertical-lr": {
                                let buffer: number = 0;
                                textRotationVal = textSettings.alignment === "right" ?
                                    textRotationVal - this.degree180 : textRotationVal;
                                let rotVal: number =
                                    textRotationVal > 0 ? textRotationVal : -textRotationVal;
                                textRotationVal = textRotationVal > 0 ?
                                    textRotationVal % this.degree180 :
                                    (-textRotationVal) % this.degree180;
                                rotVal = rotVal % this.degree360;
                                if (rotVal < this.degree180) {
                                    buffer = (rotVal / upper * 2) * textSettings.fontSize;
                                } else {
                                    buffer = ((this.degree360 - rotVal) / upper * 2)
                                        * textSettings.fontSize;
                                }
                                if (textSettings.alignment === "left") {
                                    this.finalTextContainer
                                        .style("margin-left", `${((textHeight / 2) *
                                            Math.sin(this.toRadians(textRotationVal)))}px`);
                                } else if (textSettings.alignment === "right") {
                                    this.finalTextContainer
                                        .style("margin-left", `${-((textHeight / 2) *
                                            Math.sin(this.toRadians(textRotationVal)) + buffer)}px`);
                                }
                            }
                                                break;
                            default: break;
                        }
                    }
                                break;
                    case "middle": {
                        this.textOverflowMiddle(textRotationVal, textSettings, textHeight, textWidth);
                    }
                                   break;
                    case "bottom": {
                        this.textOverflowBottom(textRotationVal, textSettings, textHeight, textWidth, textWidth2);
                    }              break;
                    default: break;
                }
            }
        }

        /**
         * Method that returns default text settings
         */
        public getDefaultTextSettings(): ITextSettings {
            return {
                alignment: "left",
                alignmentV: "top",
                color: "#000000",
                direction: "horizontal-tb",
                fontSize: 18,
                letterSpacing: null,
                lineHeight: null,
                lineIndent: null,
                perspective: null,
                skewX: null,
                skewY: null,
                textIndent: null,
                textRotate: null,
                transparency: null,
                wordSpacing: null,
            };
        }

        /**
         * Method that returns text settings
         * @param {DataView} dataView              - the dataview object, which contains all
         *                                           data needed to render the visual.
         */
        public getTextSettings(dataView: DataView): ITextSettings {
            let objects: DataViewObjects = null;
            const textSetting: ITextSettings = this.getDefaultTextSettings();
            if (!dataView || !dataView.metadata || !dataView.metadata.objects) {
                return textSetting;
            }
            const upper = 100;
            const lower = -3;
            objects = dataView.metadata.objects;
            textSetting.color = DataViewObjects.getFillColor(objects,
                questTextProperties.textSettings.color, textSetting.color);
            textSetting.transparency = DataViewObjects.getValue(objects, questTextProperties.textSettings.transparency,
                textSetting.transparency) === null ?
                null : (DataViewObjects.getValue(objects,
                    questTextProperties.textSettings.transparency, textSetting.transparency) > upper ?
                    100 : (DataViewObjects.getValue(
                        objects, questTextProperties.textSettings.transparency, textSetting.transparency) < 0 ?
                        0 : DataViewObjects.getValue(
                            objects, questTextProperties.textSettings.transparency, textSetting.transparency)
                    ));
            textSetting.fontSize = DataViewObjects.getValue(objects,
                questTextProperties.textSettings.fontSize, textSetting.fontSize);
            textSetting.alignment = DataViewObjects.getValue(objects,
                questTextProperties.textSettings.alignment, textSetting.alignment);
            textSetting.alignmentV = DataViewObjects.getValue(objects,
                questTextProperties.textSettings.alignmentV, textSetting.alignmentV);
            textSetting.direction = DataViewObjects.getValue(objects,
                questTextProperties.textSettings.direction, textSetting.direction);
            const letSpace = DataViewObjects.getValue(objects,
                questTextProperties.textSettings.letterSpacing, textSetting.letterSpacing) < lower ?
                lower : DataViewObjects.getValue(objects,
                    questTextProperties.textSettings.letterSpacing, textSetting.letterSpacing) > upper / 2 ?
                    upper / 2 : DataViewObjects.getValue(objects,
                        questTextProperties.textSettings.letterSpacing, textSetting.letterSpacing);
            textSetting.letterSpacing = letSpace;
            const wordSpace = DataViewObjects.getValue(objects, questTextProperties.textSettings.wordSpacing,
                textSetting.wordSpacing) < lower ?
                lower : DataViewObjects.getValue(objects,
                    questTextProperties.textSettings.wordSpacing, textSetting.wordSpacing) > upper / 2 ?
                    upper / 2 : DataViewObjects.getValue(objects, questTextProperties.textSettings.wordSpacing,
                        textSetting.wordSpacing);
            textSetting.wordSpacing = wordSpace;
            const lineHeight = DataViewObjects.getValue(objects,
                questTextProperties.textSettings.lineHeight, textSetting.lineHeight) < 0 ?
                0 : DataViewObjects.getValue(objects,
                    questTextProperties.textSettings.lineHeight, textSetting.lineHeight) > upper / 2 ?
                    upper / 2 : DataViewObjects.getValue(objects,
                        questTextProperties.textSettings.lineHeight, textSetting.lineHeight);
            textSetting.lineHeight = lineHeight;
            textSetting.perspective = DataViewObjects.getValue(objects, questTextProperties.textSettings.perspective,
                textSetting.perspective);
            textSetting.perspective = textSetting.perspective === null ?
                null : (textSetting.perspective < 0 ? 0 : textSetting.perspective);
            const textIndent = DataViewObjects.getValue(objects,
                questTextProperties.textSettings.textIndent, textSetting.textIndent) < -3 ?
                -3 : DataViewObjects.getValue(objects,
                    questTextProperties.textSettings.textIndent, textSetting.textIndent);
            textSetting.textIndent = textIndent;
            const lineIndent = DataViewObjects.getValue(objects,
                questTextProperties.textSettings.lineIndent, textSetting.lineIndent) < 0 ?
                0 : DataViewObjects.getValue(objects,
                    questTextProperties.textSettings.lineIndent, textSetting.lineIndent);
            textSetting.lineIndent = lineIndent;
            const getSkew = DataViewObjects.getValue(objects,
                questTextProperties.textSettings.textRotate, textSetting.textRotate) > this.degree360 ?
                this.degree360 : DataViewObjects.getValue(objects,
                    questTextProperties.textSettings.textRotate, textSetting.textRotate);
            textSetting.textRotate = getSkew;
            textSetting.skewX = DataViewObjects.getValue(objects,
                questTextProperties.textSettings.skewX, textSetting.skewX) > this.degree360 ?
                this.degree360 : DataViewObjects.getValue(objects,
                    questTextProperties.textSettings.skewX, textSetting.skewX);
            textSetting.skewY = DataViewObjects.getValue(objects,
                questTextProperties.textSettings.skewY, textSetting.skewY) > this.degree360 ?
                this.degree360 : DataViewObjects.getValue(objects,
                    questTextProperties.textSettings.skewY, textSetting.skewY);
            return textSetting;
        }

        /**
         * Method to set static text settings to default
         */
        public getDefaultStaticTextSettings(): IStaticTextSettings {
            return {
                backgroundColor: "#fff",
                boldStyle: false,
                fontFamily: "Segoe UI",
                fontWeight: "normal",
                italicStyle: false,
                overline: false,
                postText: "",
                showColon: true,
                strikeThrough: false,
                textDecoration: "none",
                textPosition: "prefix",
                textShadow: "none",
                textShadowBlur: "low",
                textShadowColor: "#000",
                textTransform: "",
                transparency: null,
                underline: false,
            };
        }

        /**
         * Method to set dynamic text settings to default
         */
        public getDefaultDynamicTextSettings(): IDynamicTextSettings {
            return {
                backgroundColor: "#FFF",
                boldStyle: false,
                fontFamily: "Segoe UI",
                fontWeight: "normal",
                italicStyle: false,
                overline: false,
                strikeThrough: false,
                textDecoration: "none",
                textShadow: "none",
                textShadowBlur: "low",
                textShadowColor: "#000",
                textTransform: "",
                transparency: null,
                underline: false,
            };
        }

        /**
         * Method to get Dynamic text settings
         * @param {DataView} dataView          - the dataview object, which contains all
         *                                       data needed to render the visual.
         */
        public getDynamicTextSettings(dataView: DataView): IDynamicTextSettings {
            let objects: DataViewObjects = null;
            const dynamicSettings: IDynamicTextSettings = this.getDefaultDynamicTextSettings();
            if (!dataView || !dataView.metadata || !dataView.metadata.objects) {
                return dynamicSettings;
            }
            const upper = 100;
            objects = dataView.metadata.objects;
            dynamicSettings.backgroundColor = DataViewObjects.getFillColor(
                objects, questTextProperties.dynamicSettings.backgroundColor, dynamicSettings.backgroundColor);
            dynamicSettings.transparency = DataViewObjects.getValue(
                objects, questTextProperties.dynamicSettings.transparency,
                dynamicSettings.transparency === null ? 0 : (DataViewObjects.getValue(
                    objects, questTextProperties.dynamicSettings.transparency, dynamicSettings.transparency) > upper ?
                    upper : (DataViewObjects.getValue(
                        objects, questTextProperties.dynamicSettings.transparency, dynamicSettings.transparency) < 0 ?
                        0 : DataViewObjects.getValue(
                            objects, questTextProperties.dynamicSettings.transparency, dynamicSettings.transparency)
                    )));
            dynamicSettings.textDecoration = DataViewObjects.getValue(
                objects, questTextProperties.dynamicSettings.textDecoration, dynamicSettings.textDecoration);
            dynamicSettings.textTransform = DataViewObjects.getValue(
                objects, questTextProperties.dynamicSettings.textTransform, dynamicSettings.textTransform);
            dynamicSettings.textShadow = DataViewObjects.getValue(
                objects, questTextProperties.dynamicSettings.textShadow, dynamicSettings.textShadow);
            dynamicSettings.textShadowBlur = DataViewObjects.getValue(
                objects, questTextProperties.dynamicSettings.textShadowBlur, dynamicSettings.textShadowBlur);
            dynamicSettings.textShadowColor = DataViewObjects.getFillColor(
                objects, questTextProperties.dynamicSettings.textShadowColor, dynamicSettings.textShadowColor);
            dynamicSettings.fontWeight = DataViewObjects.getValue(
                objects, questTextProperties.dynamicSettings.fontWeight, dynamicSettings.fontWeight);
            dynamicSettings.fontFamily = DataViewObjects.getValue(
                objects, questTextProperties.dynamicSettings.fontFamily, dynamicSettings.fontFamily);
            dynamicSettings.boldStyle = DataViewObjects.getValue(
                objects, questTextProperties.dynamicSettings.boldStyle, dynamicSettings.boldStyle);
            dynamicSettings.italicStyle = DataViewObjects.getValue(
                objects, questTextProperties.dynamicSettings.italicStyle, dynamicSettings.italicStyle);
            dynamicSettings.underline = DataViewObjects.getValue(
                objects, questTextProperties.dynamicSettings.underline, dynamicSettings.underline);
            dynamicSettings.overline = DataViewObjects.getValue(
                objects, questTextProperties.dynamicSettings.overline, dynamicSettings.overline);
            dynamicSettings.strikeThrough = DataViewObjects.getValue(
                objects, questTextProperties.dynamicSettings.strikeThrough, dynamicSettings.strikeThrough);
            return dynamicSettings;
        }

        /**
         * Method to get static text settings
         * @param {DataView} dataView          - the dataview object, which contains all
         *                                       data needed to render the visual.
         */
        public getStaticTextSettings(dataView: DataView): IStaticTextSettings {
            let objects: DataViewObjects = null;
            const textSetting: IStaticTextSettings = this.getDefaultStaticTextSettings();
            if (!dataView || !dataView.metadata || !dataView.metadata.objects) {
                return textSetting;
            }
            const upper = 100;
            objects = dataView.metadata.objects;
            textSetting.showColon = DataViewObjects.getValue(
                objects, questTextProperties.staticTextSettings.showColon, textSetting.showColon);
            textSetting.textPosition = DataViewObjects.getValue(
                objects, questTextProperties.staticTextSettings.textPosition, textSetting.textPosition);
            textSetting.textDecoration = DataViewObjects.getValue(
                objects, questTextProperties.staticTextSettings.textDecoration, textSetting.textDecoration);
            textSetting.textTransform = DataViewObjects.getValue(
                objects, questTextProperties.staticTextSettings.textTransform, textSetting.textTransform);
            textSetting.textShadow = DataViewObjects.getValue(
                objects, questTextProperties.staticTextSettings.textShadow, textSetting.textShadow);
            textSetting.textShadowBlur = DataViewObjects.getValue(
                objects, questTextProperties.staticTextSettings.textShadowBlur, textSetting.textShadowBlur);
            textSetting.textShadowColor = DataViewObjects.getFillColor(
                objects, questTextProperties.staticTextSettings.textShadowColor, textSetting.textShadowColor);
            textSetting.fontWeight = DataViewObjects.getValue(
                objects, questTextProperties.staticTextSettings.fontWeight, textSetting.fontWeight);
            textSetting.backgroundColor = DataViewObjects.getFillColor(
                objects, questTextProperties.staticTextSettings.backgroundColor, textSetting.backgroundColor);
            textSetting.transparency = DataViewObjects.getValue(
                objects, questTextProperties.staticTextSettings.transparency, textSetting.transparency === null ?
                null : (DataViewObjects.getValue(
                    objects,
                    questTextProperties.staticTextSettings.transparency,
                    textSetting.transparency) > upper ? upper
                    : (DataViewObjects.getValue(
                        objects,
                        questTextProperties.staticTextSettings.transparency,
                        textSetting.transparency) < 0 ? 0
                    : DataViewObjects.getValue(
                        objects,
                        questTextProperties.staticTextSettings.transparency,
                        textSetting.transparency)
                    )
                ));
            textSetting.fontFamily = DataViewObjects.getValue(
                objects, questTextProperties.staticTextSettings.fontFamily, textSetting.fontFamily);
            textSetting.boldStyle = DataViewObjects.getValue(
                objects, questTextProperties.staticTextSettings.boldStyle, textSetting.boldStyle);
            textSetting.italicStyle = DataViewObjects.getValue(
                objects, questTextProperties.staticTextSettings.italicStyle, textSetting.italicStyle);
            textSetting.underline = DataViewObjects.getValue(
                objects, questTextProperties.staticTextSettings.underline, textSetting.underline);
            textSetting.overline = DataViewObjects.getValue(
                objects, questTextProperties.staticTextSettings.overline, textSetting.overline);
            textSetting.strikeThrough = DataViewObjects.getValue(
                objects, questTextProperties.staticTextSettings.strikeThrough, textSetting.strikeThrough);
            textSetting.postText = DataViewObjects.getValue(
                objects, questTextProperties.staticTextSettings.postText, textSetting.postText);
            return textSetting;
        }

        /**
         * This function gets called for each of the
         * objects defined in the capabilities files and allows you to select which of the
         * objects and properties you want to expose to the users in the property pane.
         * @param {EnumerateVisualObjectInstancesOptions} options       - Map of defined objects
         */
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions):
            VisualObjectInstanceEnumeration {
            const textSetting: ITextSettings = this.getTextSettings(this.dataViews);
            const objectName: string = options.objectName, objectEnumeration: VisualObjectInstance[] = [];
            switch (objectName) {
                case "textSettings":
                    objectEnumeration.push({
                        objectName,
                        properties: {
                            alignment: textSetting.alignment, alignmentV: textSetting.alignmentV,
                            color: textSetting.color, direction: textSetting.direction,
                            fontSize: textSetting.fontSize, letterSpacing: textSetting.letterSpacing,
                            lineHeight: textSetting.lineHeight, lineIndent: textSetting.lineIndent,
                            perspective: textSetting.perspective, skewX: textSetting.skewX,
                            skewY: textSetting.skewY, textIndent: textSetting.textIndent,
                            textRotate: textSetting.textRotate, transparency: textSetting.transparency,
                            wordSpacing: textSetting.wordSpacing,
                        },
                        selector: null,
                    });
                    break;
                case "staticText":
                    if (this.staticTextSettings.textShadow === "none") {
                        objectEnumeration.push({
                            objectName,
                            properties: {// This field to keep it compatible with the older version. DO NOT DELETE.
                                backgroundColor: this.staticTextSettings.backgroundColor,
                                boldStyle: this.staticTextSettings.boldStyle,
                                fontFamily: this.staticTextSettings.fontFamily,
                                italicStyle: this.staticTextSettings.italicStyle,
                                overline: this.staticTextSettings.overline,
                                postText: this.staticTextSettings.postText,
                                showColon: this.staticTextSettings.showColon,
                                strikeThrough: this.staticTextSettings.strikeThrough,
                                textPosition: this.staticTextSettings.textPosition,
                                textShadow: this.staticTextSettings.textShadow,
                                textTransform: this.staticTextSettings.textTransform,
                                transparency: this.staticTextSettings.transparency,
                                underline: this.staticTextSettings.underline,
                            },
                            selector: null,
                        });
                    } else {
                        objectEnumeration.push({
                            objectName,
                            properties: {// This field to keep it compatible with the older version. DO NOT DELETE.
                                backgroundColor: this.staticTextSettings.backgroundColor,
                                boldStyle: this.staticTextSettings.boldStyle,
                                fontFamily: this.staticTextSettings.fontFamily,
                                italicStyle: this.staticTextSettings.italicStyle,
                                overline: this.staticTextSettings.overline,
                                postText: this.staticTextSettings.postText,
                                showColon: this.staticTextSettings.showColon,
                                strikeThrough: this.staticTextSettings.strikeThrough,
                                textPosition: this.staticTextSettings.textPosition,
                                textShadow: this.staticTextSettings.textShadow,
                                textShadowBlur: this.staticTextSettings.textShadowBlur,
                                textShadowColor: this.staticTextSettings.textShadowColor,
                                textTransform: this.staticTextSettings.textTransform,
                                transparency: this.staticTextSettings.transparency,
                                underline: this.staticTextSettings.underline,
                            },
                            selector: null });
                    }
                    break;
                case "Settings":
                    if (this.dynamicSettings.textShadow === "none") {
                        objectEnumeration.push({
                            objectName,
                            properties: {
                                backgroundColor: this.dynamicSettings.backgroundColor, boldStyle: this.dynamicSettings.boldStyle,
                                fontFamily: this.dynamicSettings.fontFamily, italicStyle: this.dynamicSettings.italicStyle,
                                overline: this.dynamicSettings.overline, strikeThrough: this.dynamicSettings.strikeThrough,
                                textShadow: this.dynamicSettings.textShadow, textTransform: this.dynamicSettings.textTransform,
                                transparency: this.dynamicSettings.transparency, underline: this.dynamicSettings.underline 
                            },
                            selector: null });
                    } else {
                        objectEnumeration.push({
                            objectName,
                            properties: {
                                backgroundColor: this.dynamicSettings.backgroundColor,
                                boldStyle: this.dynamicSettings.boldStyle,
                                fontFamily: this.dynamicSettings.fontFamily,
                                italicStyle: this.dynamicSettings.italicStyle,
                                overline: this.dynamicSettings.overline,
                                strikeThrough: this.dynamicSettings.strikeThrough,
                                textShadow: this.dynamicSettings.textShadow,
                                textShadowBlur: this.dynamicSettings.textShadowBlur,
                                textShadowColor: this.dynamicSettings.textShadowColor,
                                textTransform: this.dynamicSettings.textTransform,
                                transparency: this.dynamicSettings.transparency,
                                underline: this.dynamicSettings.underline },
                            selector: null });
                    }
                    break;
                default: break;
            }
            return objectEnumeration;
        }

        /**
         * Method to get final static text
         * @param text                 - variable to store the final text
         * @param fontStyleClass       - variable that holds the font class of the text
         * @param textDecoration       - variable that holds the decoration property of the text
         * @param textFontSize         - variable that stores the font size of the text
         * @param textFontFamily       - variable that stores the font family of the text
         * @param backgroundColor      - variable that stores the background color information
         * @param textTrans            - variable that stores the transperancy value of the text
         * @param staticTextShadow     - variable that stores the text shadow value of the static text
         * @param staticTextShadowBlur - variable that stores the text shadow blur value of the static text
         * @param staticTextShadowColor - variable that stores the text shadow color value of the static text
         * @param fontWeight           - variable that stores the value of font weight
         */
        private getTexts(
            text: string,
            fontStyleClass: string,
            textDecoration: string,
            textFontSize: number,
            textFontFamily: string,
            backgroundColor: string,
            textTrans: string,
            staticTextShadow: string,
            staticTextShadowBlur: string,
            staticTextShadowColor: string,
            fontWeight: string): void {
            this.finalTextContainer.append("span")
                .classed("staticText", true)
                .text(text)
                .classed(fontStyleClass, true)
                .style("font-size", this.pointToPixel(textFontSize))
                .style("font-family", textFontFamily)
                .style("background-color", backgroundColor +
                    this.getOpacityHex(this.staticTextSettings.transparency === null
                        ? 0 : this.staticTextSettings.transparency))
                .style("text-decoration", textDecoration)
                .style("text-shadow", this.getTextShadow(staticTextShadow, staticTextShadowBlur, staticTextShadowColor))
                .style("font-weight", fontWeight)
                .style("text-transform", textTrans)
                .style("border-radius", "5px");
        }

        /**
         * Method to get final dynamic text
         * @param text              - variable to store the final text
         * @param fontStyleClass    - variable that holds the font class of the text
         * @param textDecoration    - variable that holds the decoration property of the text
         * @param textFontSize      - variable that stores the font size of the text
         * @param dynTextShadow     - variable that stores the text shadow value of the dynamic text
         * @param dynTextShadowBlur - variable that stores the text shadow color value of the dynamic text
         * @param dynTextShadowColor - variable that stores the text shadow color value of the dynamic text
         * @param textFontFamily     - variable that stores the font family of the text
         * @param backgroundColor    - variable that stores the background color information
         * @param fontWeight         - variable that stores the value of font weight
         * @param textTransD         - variable that stores the transperancy value of the dynamic text
         */
        private getText(
            text: string,
            fontStyleClass: string,
            textDecoration: string,
            textFontSize: number,
            dynTextShadow: string,
            dynTextShadowBlur: string,
            dynTextShadowColor: string,
            textFontFamily: string,
            backgroundColor: string,
            fontWeight: string,
            textTransD: string): void {
            this.finalTextContainer.append("span")
                .classed("dynamicText", true)
                .text(text)
                .classed(fontStyleClass, true)
                .style("font-size", this.pointToPixel(textFontSize))
                .style("font-family", textFontFamily)
                .style("text-shadow", this.getTextShadow(dynTextShadow, dynTextShadowBlur, dynTextShadowColor))
                .style("font-weight", fontWeight)
                .style("background-color", backgroundColor +
                    this.getOpacityHex(this.dynamicSettings.transparency === null
                        ? 0 : this.dynamicSettings.transparency))
                .style("text-decoration", textDecoration)
                .style("text-transform", textTransD)
                .style("border-radius", "5px");
        }

        /**
         * Method to add colon to the final text
         * @param colonText   - variable on which the colon is to be added
         */
        private colonText(colonText: string): void {
            this.finalTextContainer.append("span")
                .classed("dynamicpluscolon", true)
                .text(colonText);
        }

        /**
         * Method to add space to the final text
         */
        private addSpace(): void {
            this.finalTextContainer.append("span")
                .classed("space", true)
                .text(" ");
        }
    }
}
