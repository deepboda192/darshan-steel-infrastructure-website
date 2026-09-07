/**
 * ============================================================================
 * CLIENTS — logo wall
 * ============================================================================
 * Client marks supplied by DSI on 2026-09-07. Files live in
 * public/images/clients/; each entry carries the source pixel size so the
 * browser can reserve space before the file arrives.
 *
 * Order is display order, as specified by DSI. Add or remove entries here —
 * the homepage wall renders whatever is listed.
 * ============================================================================
 */

export type Client = {
  name: string
  src: string
  width: number
  height: number
}

export const clients: Client[] = [
  { name: 'Jai Ganesh Hero',            src: '/images/clients/jai-ganesh-hero.png',    width: 107, height: 105 },
  { name: 'Infinium Toyota',            src: '/images/clients/infinium-toyota.png',    width: 167, height: 152 },
  { name: 'Nayara',                     src: '/images/clients/nayara.png',             width: 392, height: 266 },
  { name: 'Lemit Papers',               src: '/images/clients/lemit-papers.png',       width: 284, height: 183 },
  { name: 'Involt Energy Efficiency',   src: '/images/clients/involt.png',             width: 157, height: 60 },
  { name: 'Ambani Paper',               src: '/images/clients/ambani-paper.png',       width: 200, height: 77 },
  { name: 'Diyan Papers LLP',           src: '/images/clients/diyan-papers.png',       width: 267, height: 267 },
  { name: 'Pelican',                    src: '/images/clients/pelican.png',            width: 454, height: 125 },
  { name: 'Jupiter',                    src: '/images/clients/jupiter.png',            width: 200, height: 200 },
  { name: 'Davat Beverages',            src: '/images/clients/davat.png',              width: 280, height: 177 },
  { name: 'Favrito',                    src: '/images/clients/favrito.png',            width: 244, height: 207 },
  { name: 'McPatel',                    src: '/images/clients/mcpatel.png',            width: 502, height: 201 },
  { name: 'Mascot Forge Pvt. Ltd.',     src: '/images/clients/mascot-forge.png',       width: 238, height: 211 },
  { name: 'EPP',                        src: '/images/clients/epp.png',                width: 178, height: 72 },
  { name: 'Aeron',                      src: '/images/clients/aeron.png',              width: 224, height: 155 },
  { name: 'DCI',                        src: '/images/clients/dci.png',                width: 207, height: 167 },
  { name: 'Action Metal & Tubes LLP',   src: '/images/clients/action-metal-tubes.png', width: 233, height: 212 },
  { name: 'Actionware Quality Products', src: '/images/clients/actionware.png',        width: 230, height: 229 },
  { name: 'Saurashtra',                 src: '/images/clients/saurashtra.png',         width: 421, height: 51 },
  { name: 'Seabird Marine',             src: '/images/clients/seabird-marine.png',     width: 256, height: 174 },
  { name: 'Tileque Surfaces LLP',       src: '/images/clients/tileque.png',            width: 477, height: 115 },
]
