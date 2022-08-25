const { Plugin } = require("powercord/entities");
const { React, getModule, getModuleByDisplayName } = require("powercord/webpack");
const { inject, uninject } = require("powercord/injector");

module.exports = class ShowMediaLinks extends Plugin {
    startPlugin() {
        const Message = getModule(x => x.default?.displayName === "Message", false);
        const Anchor = React.memo(getModuleByDisplayName("Anchor", false));

        inject("sml-inject", Message, "default", (e) => {
            const props = e[0]?.childrenMessageContent.props;
            if (!props.message) return e;
            if (props.content.length === 0 && props.message.content.length !== 0) {
                props.content.push(
                    <Anchor title={props.message.content} href={props.message.content}>{props.message.content}</Anchor>
                );
            }
            return e;
        }, true)
    }

    pluginWillUnload() {
        uninject("sml-inject");
    }
}
