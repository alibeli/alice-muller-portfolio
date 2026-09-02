import { sendTransactionalEmail } from "./emails/sendEmail";

export type ViewedProject = {
  slug: string;
  title: string;
};

export type PortfolioViewAlertArgs = {
  normalizedEmail: string;
  projectTitle: string;
  projectSlug: string;
  viewedAt: number;
  viewedProjects: ViewedProject[];
  totalViews: number;
};

function formatViewedProjectsList(projects: ViewedProject[]): string {
  if (projects.length === 0) return "—";
  return projects.map((project) => `• ${project.title} (${project.slug})`).join("\n");
}

function formatViewedProjectsHtml(projects: ViewedProject[]): string {
  if (projects.length === 0) return "<p><em>No projects recorded yet.</em></p>";
  const items = projects
    .map((project) => `<li><strong>${project.title}</strong> (<code>${project.slug}</code>)</li>`)
    .join("");
  return `<ul>${items}</ul>`;
}

export function buildPortfolioViewAlert(args: PortfolioViewAlertArgs) {
  const viewedAt = new Date(args.viewedAt).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Zurich",
  });

  const projectListText = formatViewedProjectsList(args.viewedProjects);
  const uniqueProjectCount = args.viewedProjects.length;

  return {
    subject: `Portfolio view: ${args.projectTitle}`,
    text: [
      `${args.normalizedEmail} opened "${args.projectTitle}" (${args.projectSlug}).`,
      `Time: ${viewedAt}`,
      "",
      "Projects viewed by this visitor:",
      projectListText,
      "",
      `Total views: ${args.totalViews}`,
      `Distinct projects: ${uniqueProjectCount}`,
    ].join("\n"),
    html: `
      <p><strong>${args.normalizedEmail}</strong> opened
      <strong>${args.projectTitle}</strong> (<code>${args.projectSlug}</code>).</p>
      <p>Time: ${viewedAt}</p>
      <p><strong>Projects viewed by this visitor:</strong></p>
      ${formatViewedProjectsHtml(args.viewedProjects)}
      <p>Total views: ${args.totalViews}<br/>
      Distinct projects: ${uniqueProjectCount}</p>
    `,
  };
}

export async function sendPortfolioViewAlert(
  to: string[],
  args: PortfolioViewAlertArgs,
): Promise<{ id: string } | null> {
  const email = buildPortfolioViewAlert(args);
  return sendTransactionalEmail({
    to,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });
}
