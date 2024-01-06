function e(name, style = '', def) {
    customElements.define(
        name,
        class extends HTMLElement {
            connectedCallback(props) {
                def?.onMount(this)
                const s = document.createElement('style')
                s.innerHTML = `${name} { ${style} }`
                this.appendChild(s)
                this.template = this.innerHTML;
                if(def.fn) Object.assign(this, def)
            }
            set(o) {

            }
        }
    )
}

e('x-nav-menu', "border: '4px green solid'", {
    onmount() {
    },
    click() {
    }
})

e('x-nav-search-bar', "border: '4px green solid'", {
    onmount() {
    },
    set(o) {
    },
    click() {
    }
})

e('x-nav-search-with-voice', "border: '4px green solid'", {
    onmount() {
    },
    set(o) {
    },
    click() {
    }
})

e('x-nav-upload', "border: '4px green solid'", {
    onmount() {
    },
    set(o) {
    },
    click() {
    }
})

e('x-nav-notifications', "border: '4px green solid'", {
    onmount() {
    },
    set(o) {
    },
    click() {
    }
})

e('x-nav-authentication', "border: '4px green solid'", {
    onmount() {
    },
    set(o) {
    },
    click() {
    }
})

e('x-nav-topics-list', "border: '4px green solid'", {
    onmount() {
    },
    set(o) {
    },
    click() {
    }
})

e('x-videos-panel', "border: '4px green solid'", {
    onmount() {
    },
    set(o) {
    },
    click() {
    }
})

e('x-video', "border: '4px green solid'", {
    onmount() {
    },
    set(o) {
    },
    click() {
    }
})

e('x-popout-player', "border: '4px green solid'", {
    onmount() {
    },
    set(o) {
    },
    click() {
    }
})


e('x-about-you-panel', "border: '4px green solid'", {
    onmount() {
    },
    set(o) {
    },
    click() {
    }
})

e('x-watch-history-panel', "border: '4px green solid'", {
    onmount() {
    },
    set(o) {
    },
    click() {
    }
})

e('x-your-videos-panel', "border: '4px green solid'", {
    onmount() {
    },
    set(o) {
    },
    click() {
    }
})

e('x-settings-panel', "border: '4px green solid'", {
    onmount() {
    },
    set(o) {
    },
    click() {
    }
})

e('x-help-panel', "border: '4px green solid'", {
    onmount() {
    },
    set(o) {
    },
    click() {
    }
})
