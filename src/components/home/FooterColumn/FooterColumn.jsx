export const FooterColumn = ({ title, links }) => (
    <div className="footer-column links-col">
        <h4>{title}</h4>
        <ul>
            {links.map((link, index) => (
                <li key={index}><a href={link.href}>{link.label}</a></li>
            ))}
        </ul>
    </div>
);