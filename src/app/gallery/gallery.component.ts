import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  imagesArray: Array<string> = [
    'https://c4.wallpaperflare.com/wallpaper/70/929/217/anime-naruto-shippuuden-gaara-wallpaper-preview.jpg',
    'https://c4.wallpaperflare.com/wallpaper/404/527/706/naruto-kakashi-hatake-hd-wallpaper-preview.jpg',
    'https://c4.wallpaperflare.com/wallpaper/204/1005/136/anime-naruto-pain-naruto-wallpaper-preview.jpg',
    'https://c4.wallpaperflare.com/wallpaper/93/89/108/anime-japanese-art-uzumaki-naruto-naruto-shippuuden-wallpaper-preview.jpg',
    'https://c4.wallpaperflare.com/wallpaper/365/244/884/uchiha-itachi-naruto-shippuuden-anbu-silhouette-wallpaper-preview.jpg',
    'https://c4.wallpaperflare.com/wallpaper/148/211/691/uzumaki-naruto-naruto-shippuuden-wallpaper-preview.jpg',
  ];

  ngOnInit(): void {}
}
