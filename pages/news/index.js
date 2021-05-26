import { Fragment } from "react";
import Link from 'next/link'

function NewsPage() {
  return (
    <Fragment>
      <h1>The News Page</h1>
      <ul>
        <li><Link href="/news/hello-article">Hello Article</Link></li>
        <li>Hello Article 1</li>
      </ul>
    </Fragment>
  );
}

export default NewsPage;
