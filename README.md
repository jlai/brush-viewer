# brush-viewer

A web-based viewer for .abr brush files. This extracts brush images from the brush presets file.

Currently ABR versions 6-10 are supported. Only the brush images are extracted right now; other information
like brush jitter is not currently parsed.

## Online

https://jlai.github.io/brush-viewer

## Tech

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Parsing is done with [kaitai](https://kaitai.io/). The ksy is largely based on reading through the source code to
[ABRViewer](https://github.com/lusores/ABRViewer), which has been hugely helpful in understanding the .abr format.

## Reporting Issues

File a ticket on the [project issue tracker](https://github.com/jlai/brush-viewer/issues/new). Include the error message,
if any, and your browser/OS.

Do not attach any .abr files unless you created them yourself. If it's freely available online (or reasonably cheap),
mention where you can download it from rather than attaching the file.

## License

MIT
