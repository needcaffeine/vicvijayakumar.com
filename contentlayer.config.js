/* eslint-disable no-underscore-dangle */
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrism from 'rehype-prism-plus'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
            required: true,
        },
        createdAt: {
            type: 'date',
            required: true,
        },
        updatedAt: {
            type: 'date',
            required: true,
        },
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: (post) =>
                `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post._raw.flattenedPath}`,
        },
        slug: {
            type: 'string',
            resolve: (post) => post._raw.flattenedPath,
        },
        githubLink: {
            type: 'string',
            resolve: (post) =>
                `${process.env.NEXT_PUBLIC_GITHUB_PATH}/data/blog/${post._raw.sourceFilePath}`,
        },
        readingTime: {
            type: 'json',
            resolve: (post) => readingTime(post.body.raw),
        },
    },
}))

export default makeSource({
    contentDirPath: 'data/blog',
    documentTypes: [Post],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeCodeTitles,
            rehypePrism,
            rehypeSlug,
            [
                rehypeAutolinkHeadings,
                {
                    behavior: 'append',
                    properties: { class: 'headingLink' },
                    content: {
                        type: 'text',
                        value: '#',
                    },
                },
            ],
        ],
    },
})
