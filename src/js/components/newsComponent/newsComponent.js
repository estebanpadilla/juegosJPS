import './newsComponent.css';
import { Component } from '../component';
import { AppManager } from '../../managers/appManager';
import { SorteoComponent } from '../sorteoComponent/sorteoComponent';

export class NewsComponent extends Component {
    constructor(parent) {
        super(parent);
        this.container.classList.add('newsComponent');


        AppManager.instance.dataManager.data.data.contentSections.forEach(contentSection => {
            if (contentSection.title === 'Próximos Sorteos') {

                var title = document.createElement('h1');
                title.innerHTML = contentSection.title;
                title.classList.add('title');
                this.container.appendChild(title);

                this.newsContainer = document.createElement('div');
                this.newsContainer.classList.add('newsContainer');
                this.container.appendChild(this.newsContainer);

                contentSection.sorteos.forEach(sorteo => {
                    this.sorteoComponent = new SorteoComponent(this.newsContainer, sorteo);
                });

                this.news = document.createElement('div');
                this.news.classList.add('news');
                this.newsContainer.appendChild(this.news);

                this.image = document.createElement('img');
                this.image.src = './src/images/' + contentSection.news.image;
                this.news.appendChild(this.image);
                this.image.classList.add('newsImage');

            }
        });
    }
}