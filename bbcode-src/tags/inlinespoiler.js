/**
 * @file Adds [inlineSpoiler] and [ispoiler] to bbcode
 * @example [inlineSpoiler]content[/inlineSpoiler]
 */

const toNode = (tag, attrs, content) => ({
    tag,
    attrs,
    content
});

export const inlinespoiler = {
    inlinespoiler: (node) => toNode('span', {class: 'inlineSpoiler'}, node.content),
    ispoiler: (node) => toNode('span', {class: 'iSpoiler'}, node.content),
};

