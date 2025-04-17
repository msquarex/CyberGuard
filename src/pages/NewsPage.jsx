"use client"

import { useState, useEffect } from "react"
import "../styles/news.css"

const NEWS_API_KEY = 'c49f3b0884ef43679a0c2142a544c2ff'; 
const NEWS_API_URL = 'https://newsapi.org/v2/everything'; 

export default function NewsPage() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchNews = async (pageNum = 1) => {
    try {
      setLoading(true)
      const response = await fetch(
        `${NEWS_API_URL}?q=cybersecurity&language=en&sortBy=publishedAt&page=${pageNum}&apiKey=${NEWS_API_KEY}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch news')
      }

      const data = await response.json()
      
      if (data.articles.length === 0) {
        setHasMore(false)
        return
      }

      const formattedNews = data.articles.map((article, index) => ({
        id: (pageNum - 1) * 20 + index + 1,
        title: article.title,
        summary: article.description || 'No description available',
        source: article.source.name,
        url: article.url,
        date: new Date(article.publishedAt).toISOString().split('T')[0],
        category: getCategoryFromTitle(article.title)
      }))

      if (pageNum === 1) {
        setNews(formattedNews)
      } else {
        setNews(prevNews => [...prevNews, ...formattedNews])
      }
      
      setLoading(false)
    } catch (err) {
      setError("Failed to fetch news. Please try again later.")
      setLoading(false)
    }
  }

  const getCategoryFromTitle = (title) => {
    const titleLower = title.toLowerCase()
    if (titleLower.includes('vulnerability') || titleLower.includes('exploit')) {
      return 'vulnerability'
    } else if (titleLower.includes('attack') || titleLower.includes('breach')) {
      return 'attack'
    } else if (titleLower.includes('phishing') || titleLower.includes('scam')) {
      return 'phishing'
    } else if (titleLower.includes('policy') || titleLower.includes('regulation')) {
      return 'policy'
    } else {
      return 'technology'
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchNews(nextPage)
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "vulnerability":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="category-icon vulnerability"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
            <path d="M12 9v4"></path>
            <path d="M12 17h.01"></path>
          </svg>
        )
      case "attack":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="category-icon attack"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        )
      case "phishing":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="category-icon phishing"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
            <path d="M12 9v4"></path>
            <path d="M12 17h.01"></path>
          </svg>
        )
      case "policy":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="category-icon policy"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        )
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="category-icon default"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        )
    }
  }

  if (loading && news.length === 0) {
    return <div className="loading-spinner"></div>
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

  return (
    <div className="news-page">
      <div className="news-header">
        <h1>Cybersecurity News</h1>
        <p>Stay informed about the latest cybersecurity threats, vulnerabilities, and industry updates.</p>
      </div>

      <div className="news-grid">
        {news.map((item) => (
          <article key={item.id} className="news-card">
            <div className="news-card-content">
              <div className="news-meta">
                <div className="news-category">
                  {getCategoryIcon(item.category)}
                  <span className="category-name">{item.category}</span>
                </div>
                <span className="meta-separator">•</span>
                <div className="news-date">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>{item.date}</span>
                </div>
              </div>

              <h2 className="news-title">{item.title}</h2>
              <p className="news-summary">{item.summary}</p>

              <div className="news-footer">
                <span className="news-source">Source: {item.source}</span>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="news-link">
                  Read more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {hasMore && (
        <div className="load-more-container">
          <button 
            className="button button-cyan load-more-button"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  )
}

