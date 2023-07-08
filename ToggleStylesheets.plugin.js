/**
* @name ToggleStylesheets
* @displayName ToggleStylesheets
* @authorId 582170007505731594
* @invite ZfPH6SDkMW
* @version 2.0.0
*/
/*@cc_on
@if (@_jscript)
     
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you"ve mistakenly tried to run me directly. \n(Don"t do that!)", 0, "I"m a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I"m in the correct folder already.", 0, "I"m already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can"t find the BetterDiscord plugins folder.\nAre you sure it"s even installed?", 0, "Can"t install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord"s plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I"m installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();
@else@*/


const { Webpack, DOM } = BdApi;
const ButtonContainer = Webpack.getModule(m => m.attachButton).buttonContainer;
const ButtonsContainer = Webpack.getModule(m => m.sansAttachButton);

const createElement = (type, props, ...children) => {
    if (typeof type === "function") return type({ ...props, children: [].concat() })

    const node = document.createElement(type);

    for (const key of Object.keys(props)) {
        if (key.indexOf("on") === 0) node.addEventListener(key.slice(2).toLowerCase(), props[key]);
        else if (key === "children") {
            node.append(...(Array.isArray(props[key]) ? props[key] : [].concat(props[key])));
        } else {
            node.setAttribute(key === "className" ? "class" : key, props[key]);
        }
    }

    if (children.length) node.append(...children);

    node.getElementByClass = (clss) => {
        return node.getElementsByClassName(clss)[0];
    }

    return node;
};

class ToggleStyleSheetButton {
    constructor(target) {
        this.ref = null;
        this.target = target;
        this._destroyed = false;

        target._patched = true;

        this.container = createElement("div", {
            className: `${ButtonContainer} toggleStylesBtn`,
        });


        DOM.onRemoved(target, () => this.unmount());
    }

    unmount() {
        this.ref?.remove();
        this._destroyed = true;
        this.target._patched = false;
    }

    mount() {
        if (this._destroyed) return false;

        const res = this.render();
        if (!res) this.ref?.remove();
        else {
            if (this.ref) {

            } else {
                this.target.appendChild(res);
            }

            this.ref = res;
        }
    }

    render() {
        const container = this.container.cloneNode(true);
        container._unmount = this.unmount.bind(this);

        let buttonWrapper = createElement("button", {
            class: "button-ejjZWC lookBlank-FgPMy6 colorBrand-2M3O3N grow-2T4nbg",
            type: "button",
            onclick: () => {
                let customCSS = document.getElementById("customcss");

                if (customCSS.tagName == "STYLE") {
                    let disabledCustomCSS = createElement('style-disabled', { id: "customcss" });
                    disabledCustomCSS.innerHTML = customCSS.innerHTML;
                    customCSS.parentNode.replaceChild(disabledCustomCSS, customCSS);

                    document.getElementsByTagName("bd-themes")[0].childNodes.forEach(theme => {
                        let disabledTheme = createElement('style-disabled', { id: theme.id });
                        disabledTheme.innerHTML = theme.innerHTML;
                        theme.parentNode.replaceChild(disabledTheme, theme);
                    });

                    try {
                        let colorway = document.getElementById("activeColorway");
                        let disabledColorway = createElement('style-disabled', { id: "activeColorway" });
                        disabledColorway.innerHTML = colorway.innerHTML;
                        colorway.parentNode.replaceChild(disabledColorway, colorway);
                    } catch (e) {
                        console.log("Colorways not present");
                    }
                    let hideAllStylesheets = createElement("style", { id: "hideAllStylesheets" }, `
                                .ColorwaySelectorWrapperContainer,
                                .ColorwaySelectorBtnContainer {
                                    display: none;
                                }
                                #themes-tab::after {
                                    color: var(--header-primary);
                                    content: "Stylesheets Disabled";
                                    width: 100%;
                                    text-align: center;
                                    height: 100%;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    border-radius: 4px;
                                    background-color: rgba(0,0,0,.85);
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    font-size: 20px;
                                    font-weight: 600;
                                }
                                #themes-tab {
                                    opacity: .5;
                                    pointer-events: none;
                                    position: relative;
                                    height: 100%;
                                    overflow: hidden;
                                }
                                #DiscordColorways-card::after,
                                #DiscordLayouts-card::after {
                                    color: var(--header-primary);
                                    content: "Stylesheets Disabled";
                                    width: 100%;
                                    text-align: center;
                                    height: 100%;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    border-radius: 4px;
                                    background-color: rgba(0,0,0,.85);
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    font-size: 20px;
                                    font-weight: 600;
                                }
                                #DiscordColorways-card,
                                #DiscordLayouts-card {
                                    opacity: .5;
                                    pointer-events: none;
                                    position: relative;
                                }
                                .toggleStylesBtn {
                                    display: none;
                                }
                                .inner-NQg18Y:has(:focus) .toggleStylesBtn,
                                .toggleStylesBtn:hover {
                                    display: flex;
                                }
                                `);
                                document.head.append(hideAllStylesheets);
                } else {
                    let enabledCustomCSS = createElement('style', { id: "customcss" });
                    enabledCustomCSS.innerHTML = customCSS.innerHTML;
                    customCSS.parentNode.replaceChild(enabledCustomCSS, customCSS);

                    document.getElementsByTagName("bd-themes")[0].childNodes.forEach(theme => {
                        let enabledTheme = createElement('style', { id: theme.id });
                        enabledTheme.innerHTML = theme.innerHTML;
                        theme.parentNode.replaceChild(enabledTheme, theme);
                    });

                    try {
                        let colorway = document.getElementById("activeColorway");
                        let enabledColorway = createElement('style', { id: "activeColorway" });
                        enabledColorway.innerHTML = colorway.innerHTML;
                        colorway.parentNode.replaceChild(enabledColorway, colorway);
                    } catch (e) {
                        console.log("Colorways not present");
                    }
                    try { document.getElementById("hideAllStylesheets").remove(); } catch (e) { }
                }
            }
        });

        buttonWrapper.innerHTML = `<div class="contents-3NembX button-2fCJ0o button-3BaQ4X stickerButton-1-nFh2"><div class="buttonWrapper-3YFQGJ" style="opacity: 1; transform: none;"><svg viewBox="0 0 24 24" fill="currentColor" class="bd-icon" style="width: 24px; height: 24px;"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></svg></div></div>`;

        container.append(buttonWrapper);
        BdApi.UI.createTooltip(container, "Toggle all stylesheets (Click on the chatbox or hover over me to appear)", {});
        return container;
    }
}

const ElementInjections = {
    [ButtonsContainer?.buttons]: elements => {
        for (const el of elements) {
            if (el.getElementsByClassName("toggleStylesBtn").length || el._patched) continue;

            new ToggleStyleSheetButton(el).mount();
        }
    }
};
module.exports = class ToggleStylesheets {
    constructor() {
        this._config;
    }
    load() { }
    start() {
        for (const className in ElementInjections) {
            const elements = Array.from(document.getElementsByClassName(className));

            if (elements.length) {
                ElementInjections[className](elements);
            }
        }
    }

    observer({ addedNodes }) {
        for (const added of addedNodes) {
            if (added.nodeType === Node.TEXT_NODE) continue;

            for (const className in ElementInjections) {
                const elements = Array.from(added.getElementsByClassName(className));

                if (elements.length) {
                    ElementInjections[className](elements);
                }
            }
        }
    }

    stop() {
        document.querySelectorAll(".toggleStylesBtn").forEach(el => el._unmount?.());
        let customCSS = document.getElementById("customcss");
        let enabledCustomCSS = createElement('style', { id: "customcss" });
        enabledCustomCSS.innerHTML = customCSS.innerHTML;
        customCSS.parentNode.replaceChild(enabledCustomCSS, customCSS);

        document.getElementsByTagName("bd-themes")[0].childNodes.forEach(theme => {
            let enabledTheme = createElement('style', { id: theme.id });
            enabledTheme.innerHTML = theme.innerHTML;
            theme.parentNode.replaceChild(enabledTheme, theme);
        });

        try {
            let colorway = document.getElementById("activeColorway");
            let enabledColorway = createElement('style', { id: "activeColorway" });
            enabledColorway.innerHTML = colorway.innerHTML;
            colorway.parentNode.replaceChild(enabledColorway, colorway);
        } catch (e) {
            console.log("Colorways not present");
        }
        try { document.getElementById("hideAllStylesheets").remove(); } catch (e) { }
    }
};
/*@end@*/
