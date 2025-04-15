// api.ts
// Fetch and render news articles

const apiKey: string = "ff3533c370c840c78f12e541c654e2e0";
const proxyUrl: string = "https://api.allorigins.win/raw?url=";
const apiUrl: string = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${apiKey}`;
const fullUrl: string = proxyUrl + encodeURIComponent(apiUrl);

export function loadNews(containerId: string): void {
    const newsContainer = document.getElementById(containerId);

    if (newsContainer) {
        newsContainer.innerHTML = `
            <div class="text-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;

        fetch(fullUrl)
            .then(response => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })
            .then(data => {
                newsContainer.innerHTML = "";

                if (data.status === "ok" && data.articles?.length > 0) {
                    data.articles.forEach((article: any) => {
                        const articleCard = `
                            <div class="card mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">${article.title}</h5>
                                    <p class="card-text">${article.description || "No description available."}</p>
                                    <a href="${article.url}" target="_blank" class="btn btn-primary">Read More</a>
                                </div>
                            </div>
                        `;
                        newsContainer.innerHTML += articleCard;
                    });
                } else {
                    newsContainer.innerHTML = `<div class="alert alert-warning">No news articles found.</div>`;
                }
            })
            .catch(error => {
                console.error("Error fetching news:", error);
                newsContainer.innerHTML = `<div class="alert alert-danger">Failed to load news. Please try again later.</div>`;
            });
    }
}
