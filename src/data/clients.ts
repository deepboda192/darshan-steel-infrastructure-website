/**
 * ============================================================================
 * CLIENTS — logo wall
 * ============================================================================
 * Client marks supplied by DSI on 2026-09-07. Files live in
 * public/images/clients/; each entry carries the source pixel size so the
 * browser can reserve space before the file arrives.
 *
 * Order is display order, as specified by DSI. Add or remove entries here —
 * the homepage wall renders whatever is listed. Entries with a `url` render
 * as links (new tab); the rest are plain images.
 * ============================================================================
 */

export type Client = {
  name: string
  src: string
  width: number
  height: number
  /** Official site, verified reachable when added. Omit rather than guess. */
  url?: string
}

export const clients: Client[] = [
  { name: 'Jai Ganesh Hero',            src: '/images/clients/jai-ganesh-hero.png',    width: 107, height: 105, url: 'https://jaiganesh.co.in/' },
  { name: 'Infinium Toyota',            src: '/images/clients/infinium-toyota.png',    width: 167, height: 152, url: 'https://www.infinium-toyota.com/' },
  { name: 'Nayara',                     src: '/images/clients/nayara.png',             width: 392, height: 266, url: 'https://www.nayaraenergy.com/' },
  { name: 'Lemit Papers',               src: '/images/clients/lemit-papers.png',       width: 284, height: 183, url: 'https://lemitpapers.com/' },
  { name: 'Involt Energy Efficiency',   src: '/images/clients/involt.png',             width: 157, height: 60, url: 'https://www.involtenergy.com/' },
  { name: 'Ambani Paper',               src: '/images/clients/ambani-paper.png',       width: 200, height: 77, url: 'https://ambanipaper.com/' },
  { name: 'Diyan Papers LLP',           src: '/images/clients/diyan-papers.png',       width: 267, height: 267, url: 'http://www.diyanpapers.com/' },
  { name: 'Pelican',                    src: '/images/clients/pelican.png',            width: 454, height: 125, url: 'https://www.pelican.in/' },
  { name: 'Davat Beverages',            src: '/images/clients/davat.png',              width: 280, height: 177, url: 'https://www.davatbeverages.com/' },
  { name: 'Favrito',                    src: '/images/clients/favrito.png',            width: 244, height: 207, url: 'https://favrito.in/' },
  { name: 'McPatel',                    src: '/images/clients/mcpatel.png',            width: 502, height: 201 },
  { name: 'Mascot Forge Pvt. Ltd.',     src: '/images/clients/mascot-forge.png',       width: 238, height: 211 },
  { name: 'EPP',                        src: '/images/clients/epp.png',                width: 178, height: 72, url: 'https://www.eppcomposites.com/' },
  { name: 'Aeron',                      src: '/images/clients/aeron.png',              width: 224, height: 155 },
  { name: 'DCI',                        src: '/images/clients/dci.png',                width: 207, height: 167, url: 'https://dciindia.in/' },
  { name: 'Action Metal & Tubes LLP',   src: '/images/clients/action-metal-tubes.png', width: 233, height: 212, url: 'https://www.amtlindia.com/' },
  { name: 'Actionware Quality Products', src: '/images/clients/actionware.png',        width: 230, height: 229, url: 'https://www.actionware.in/' },
  { name: 'Seabird Marine',             src: '/images/clients/seabird-marine.png',     width: 256, height: 174 },
  { name: 'Tileque Surfaces LLP',       src: '/images/clients/tileque.png',            width: 477, height: 115 },
  { name: 'G M Engineering Pvt. Ltd.',   src: '/images/clients/gm-engineering.png',     width: 143, height: 55, url: 'https://www.gmengg.com/' },
  { name: 'Honey Bunny',                src: '/images/clients/honey-bunny.svg',        width: 1037, height: 757 },
  { name: 'Ganga Pipes',                src: '/images/clients/ganga-pipes.png',        width: 279, height: 186, url: 'https://www.gangapipes.com/' },
  { name: 'Slogan Polyfilms Pvt. Ltd.', src: '/images/clients/slogan-polyfilms.png',   width: 738, height: 189, url: 'https://slogangroup.in/' },
  { name: 'Sicer Italian Ceramic Surfaces', src: '/images/clients/sicer.png',          width: 500, height: 142, url: 'https://www.sicer.it/en/' },
  { name: 'Mahindra',                   src: '/images/clients/mahindra.png',           width: 600, height: 600, url: 'https://www.mahindra.com/' },
  { name: 'Gulkis',                     src: '/images/clients/gulkis.png',             width: 300, height: 200 },
  { name: 'Duhee Alloy Steel Processors', src: '/images/clients/duhee.png',            width: 975, height: 431, url: 'https://www.duheealloy.com/' },
  { name: 'Icon World of Tile',         src: '/images/clients/icon-world-of-tile.png', width: 300, height: 300, url: 'https://www.iconworldoftile.com/' },
]
