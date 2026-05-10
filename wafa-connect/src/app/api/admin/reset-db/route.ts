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
      <html>
        <head>
          <title>Base de données réinitialisée</title>
          <style>
            body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background: #f9f5ee; color: #003d2b; }
            .card { background: white; padding: 2rem; border-radius: 1rem; border: 1px solid #C9A84C; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center; }
            h1 { color: #C9A84C; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Succès !</h1>
            <p>La base de données a été vidée.</p>
            <p><strong>${result.deletedCount}</strong> documents supprimés.</p>
            <p>Vous pouvez maintenant commencer l'événement à neuf.</p>
            <br>
            <small>Pensez à supprimer ce fichier (src/app/api/admin/reset-db/route.ts) par sécurité.</small>
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
