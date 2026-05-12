// src/app/api/admin/reset-db/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Guest from '@/models/Guest'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  // Authentication check
  if (!token || token !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ 
      error: 'Non autorisé. Jeton de réinitialisation invalide.' 
    }, { status: 401 })
  }

  try {
    await connectDB()
    
    // Delete all guests
    const result = await Guest.deleteMany({})

    return new NextResponse(`
      <!DOCTYPE html>
      <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Base de données réinitialisée | Wafa Connect</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap');
            
            :root {
              --primary: #C9A84C;
              --bg: #f9f5ee;
              --text: #003d2b;
              --white: #ffffff;
            }

            body { 
              font-family: 'Outfit', sans-serif; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              min-height: 100vh; 
              margin: 0;
              background: var(--bg); 
              color: var(--text); 
            }

            .card { 
              background: var(--white); 
              padding: 3rem; 
              border-radius: 1.5rem; 
              border: 1px solid var(--primary); 
              box-shadow: 0 10px 30px rgba(0,0,0,0.05); 
              text-align: center; 
              max-width: 450px;
              width: 90%;
              animation: slideUp 0.6s ease-out;
            }

            @keyframes slideUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }

            .icon {
              font-size: 4rem;
              margin-bottom: 1.5rem;
            }

            h1 { 
              color: var(--primary); 
              font-weight: 600;
              margin-top: 0;
              font-size: 1.75rem;
            }

            p {
              line-height: 1.6;
              margin: 1rem 0;
              font-size: 1.1rem;
            }

            .count {
              display: inline-block;
              background: var(--bg);
              color: var(--primary);
              padding: 0.25rem 0.75rem;
              border-radius: 0.5rem;
              font-weight: 600;
              margin: 0.5rem 0;
            }

            .footer {
              margin-top: 2rem;
              padding-top: 1.5rem;
              border-top: 1px solid #eee;
              font-size: 0.85rem;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="icon">✨</div>
            <h1>Succès !</h1>
            <p>La base de données a été réinitialisée avec succès.</p>
            <div class="count"><strong>${result.deletedCount}</strong> documents supprimés</div>
            <p>Vous pouvez maintenant commencer l'événement à neuf.</p>
            
            <div class="footer">
              <p>⚠️ Par mesure de sécurité, pensez à restreindre l'accès à ce fichier en production.</p>
            </div>
          </div>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  } catch (err) {
    console.error('[DB_RESET_ERROR]', err)
    return NextResponse.json({ error: 'Erreur lors de la réinitialisation' }, { status: 500 })
  }
}

